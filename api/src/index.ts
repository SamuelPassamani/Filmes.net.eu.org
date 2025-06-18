import { validateAndBuildUrl } from './modules/validator';

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    
    // Define os headers de CORS para permitir que seu frontend acesse a API
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Em produção, restrinja para seu domínio!
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    // Responde a requisições OPTIONS (pre-flight) do navegador
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 1. Valida a requisição e constrói a URL de destino
    const validation = validateAndBuildUrl(request);

    if (!validation.isValid) {
      // Se a validação falhar, retorna um erro claro em JSON
      const errorResponse = { ok: false, error: validation.error };
      return new Response(JSON.stringify(errorResponse), {
        status: validation.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // A URL para a API do YTS foi construída com sucesso
    const ytsUrl = validation.url;

    // 2. Lógica de Cache
    const cache = caches.default;
    const cacheRequest = new Request(ytsUrl.toString(), request);
    let response = await cache.match(cacheRequest);

    if (response) {
      console.log('Cache HIT');
      const headers = new Headers(response.headers);
      headers.set('X-Cache-Status', 'HIT');
      // Adiciona os headers de CORS à resposta do cache
      Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));
      return new Response(response.body, { ...response, headers });
    }

    console.log('Cache MISS');

    // 3. Se não houver cache, busca na API do YTS
    response = await fetch(ytsUrl.toString());
    
    const responseToCache = response.clone();
    const headers = new Headers(response.headers);
    
    headers.set('X-Cache-Status', 'MISS');
    // Adiciona os headers de CORS à resposta da API
    Object.entries(corsHeaders).forEach(([key, value]) => headers.set(key, value));
    
    // Define o tempo de cache para 1 hora (3600 segundos)
    responseToCache.headers.set('Cache-Control', 'public, s-maxage=3600');

    ctx.waitUntil(cache.put(cacheRequest, responseToCache));

    return new Response(response.body, { status: response.status, headers });
  },
};
