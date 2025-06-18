// Arquivo: src/config/yts-api-config.ts

interface IParamValidator {
  type: 'string' | 'number' | 'boolean' | 'enum';
  required?: boolean;
  acceptedValues?: (string | number)[];
  description: string;
}

interface IYtsEndpoint {
  path: string;
  params: Record<string, IParamValidator>;
}

export const ytsApiConfig = {
  baseUrl: 'https://yts.mx/api/v2/',
  endpoints: {
    // Objeto ATUALIZADO com todas as informações da imagem
    listMovies: {
      path: 'list_movies.json',
      params: {
        limit: {
          type: 'number',
          description: 'Número de resultados por página (range: 1-50). Default: 20.',
        },
        page: {
          type: 'number',
          description: 'O número da página a ser exibida. Default: 1.',
        },
        quality: {
          type: 'enum',
          // Valores atualizados conforme a documentação
          acceptedValues: ['480p', '720p', '1080p', '2160p', '3D'],
          description: 'A qualidade do vídeo. Default: "All".',
        },
        minimum_rating: {
          type: 'number',
          description: 'Nota mínima do filme (range: 0-9). Default: 0.',
        },
        query_term: {
          type: 'string',
          description: 'Termo de busca para o título, ator, diretor, etc.',
        },
        genre: {
          type: 'string',
          description: 'Gênero do filme (ex: "action", "comedy", "horror").',
        },
        sort_by: {
          type: 'enum',
          acceptedValues: ['title', 'year', 'rating', 'peers', 'seeds', 'download_count', 'like_count', 'date_added'],
          description: 'Critério de ordenação. Default: "date_added".',
        },
        order_by: {
          type: 'enum',
          acceptedValues: ['asc', 'desc'],
          description: 'Ordem ascendente ou descendente. Default: "desc".',
        },
        // NOVO! Parâmetro adicionado com base na documentação.
        with_rt_ratings: {
          type: 'boolean',
          description: 'Retorna a lista com as notas do Rotten Tomatoes. Default: false.',
        },
      },
    } as IYtsEndpoint,

    movieDetails: {
      path: 'movie_details.json',
      params: {
        movie_id: { type: 'number', description: 'ID do filme no YTS. Obrigatório se imdb_id não for usado.' },
        imdb_id: { type: 'string', description: 'ID do filme no IMDb. Obrigatório se movie_id não for usado.' },
        with_images: { type: 'boolean', description: 'Inclui URLs de imagens.' },
        with_cast: { type: 'boolean', description: 'Inclui informações do elenco.' },
      },
    } as IYtsEndpoint,
  },
};
