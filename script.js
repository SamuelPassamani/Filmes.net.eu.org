// Função para obter parâmetros da URL
function getQueryStringParameter(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Variáveis principais
const movieId = getQueryStringParameter("id");
const imdbId = getQueryStringParameter("imdb");
const defaultPoster = "https://i.imgur.com/IG0AIMf.jpeg";

// Validação do ID do filme
if (!movieId) {
  console.error("ID do filme não encontrado na URL");
} else {
  let posterUrl = defaultPoster;

  // Obter poster via API YTS, caso o IMDB seja fornecido
  if (imdbId) {
    fetch(`https://yts.mx/api/v2/movie_details.json?imdb_id=${imdbId}`)
      .then((response) => response.json())
      .then((data) => {
        posterUrl = data.data.movie.background_image || defaultPoster;
        initPlayer(movieId, posterUrl, imdbId);
      })
      .catch((error) => {
        console.error("Erro ao buscar imagem de fundo:", error);
        initPlayer(movieId, posterUrl, imdbId);
      });
  } else {
    initPlayer(movieId, posterUrl, imdbId);
  }
}

// Inicialização do Player
function initPlayer(movieId, posterUrl, imdbId) {
  window.webtor = window.webtor || [];
  window.webtor.push({
    id: "player",
    magnet: `magnet:?xt=urn:btih:${movieId}&dn=${movieId}&tr=`,
    poster: posterUrl,
    width: "100%",
    imdbId: imdbId,
    lang: "pt",
    userLang: "pt",
    features: {
      autoSubtitles: true,
      continue: true,
      title: false,
      p2pProgress: true,
      subtitles: true,
      settings: false,
      embed: false,
      browse: false,
      download: true,
      fullscreen: true,
      playpause: true,
      currentTime: true,
      timeline: true,
      duration: true,
      volume: true,
      chromecast: true
    },
    on: function (e) {
      if (e.name == window.webtor.TORRENT_FETCHED) {
        console.log("Torrent fetched!", e.data);
      }
      if (e.name == window.webtor.TORRENT_ERROR) {
        console.log("Torrent error!");
      }
    }
  });
}
