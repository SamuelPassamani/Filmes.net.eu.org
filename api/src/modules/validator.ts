import { ytsApiConfig } from '../config/yts-api-config';

// Define uma estrutura para o resultado da validação
type ValidationResult = {
  isValid: true;
  url: URL;
} | {
  isValid: false;
  error: string;
  status: number;
};

/**
 * Valida uma requisição recebida contra as regras do yts-api-config
 * e constrói a URL de destino para a API do YTS.
 * @param request A requisição recebida pelo Worker.
 * @returns Um objeto indicando se a validação foi bem-sucedida ou não.
 */
export function validateAndBuildUrl(request: Request): ValidationResult {
  const requestUrl = new URL(request.url);
  
  // Extrai o nome do endpoint do caminho. Ex: /listMovies -> listMovies
  const endpointName = requestUrl.pathname.slice(1);

  // Verifica se o endpoint solicitado existe na nossa configuração
  if (!(endpointName in ytsApiConfig.endpoints)) {
    return { isValid: false, error: `Endpoint '${endpointName}' não encontrado.`, status: 404 };
  }
  
  // 'as keyof typeof' é um truque de TypeScript para garantir que a chave existe
  const endpointConfig = ytsApiConfig.endpoints[endpointName as keyof typeof ytsApiConfig.endpoints];
  const validParams = new URLSearchParams();

  // Itera sobre todos os parâmetros da requisição recebida
  for (const [key, value] of requestUrl.searchParams.entries()) {
    const paramRule = endpointConfig.params[key];

    // 1. O parâmetro existe na nossa lista de permitidos?
    if (!paramRule) {
      return { isValid: false, error: `Parâmetro '${key}' não é válido para este endpoint.`, status: 400 };
    }

    // 2. Se for um 'enum', o valor é um dos aceitos?
    if (paramRule.type === 'enum' && !paramRule.acceptedValues?.includes(value)) {
      return { 
        isValid: false, 
        error: `Valor '${value}' não é válido para o parâmetro '${key}'. Valores aceitos: ${paramRule.acceptedValues?.join(', ')}`, 
        status: 400 
      };
    }
    
    // (Poderíamos adicionar mais validações de tipo aqui, ex: 'number', 'boolean')

    // Se o parâmetro é válido, adiciona à lista para a URL final
    validParams.append(key, value);
  }
  
  // Constrói a URL final para a API do YTS
  const finalUrl = new URL(endpointConfig.path, ytsApiConfig.baseUrl);
  finalUrl.search = validParams.toString();

  return { isValid: true, url: finalUrl };
}
