// Função para obter parâmetros da URL
function getQueryStringParameter(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Variáveis principais
const movieId = getQueryStringParameter("id");
const imdbId = getQueryStringParameter("imdb");
const defaultPoster = "https://lh3.googleusercontent.com/d/1IP-lAqFygjiMHsOJ7dHZ11-hJc9_9Nhj?authuser=0";

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
    magnet: `magnet:?xt=urn:btih:${movieId}&dn=${movieId}&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=http%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=http%3A%2F%2Ftracker.bt4g.com%3A2095%2Fannounce&tr=udp%3A%2F%2Fbubu.mapfactor.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=https%3A%2F%2Ftrackers.mlsub.net%3A443%2Fannounce&tr=http%3A%2F%2Ftracker1.itzmx.com%3A8080%2Fannounce&tr=udp%3A%2F%2Fipv6.fuuuuuck.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.qu.ax%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.0x7c0.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fevan.im%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.yemekyedim.com%3A443%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=https%3A%2F%2Ftracker.lilithraws.org%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker.fnix.net%3A6969%2Fannounce&tr=udp%3A%2F%2Famigacity.xyz%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.files.fm%3A6969%2Fannounce&tr=udp%3A%2F%2Fmoonburrow.club%3A6969%2Fannounce&tr=http%3A%2F%2Fbt.okmp3.ru%3A2710%2Fannounce&tr=http%3A%2F%2Fipv6.rer.lol%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.draatman.uk%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.renfei.net%3A8080%2Fannounce&tr=udp%3A%2F%2Fbt1.archive.org%3A6969%2Fannounce&tr=udp%3A%2F%2Foh.fuuuuuck.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fbt2.archive.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fec2-18-191-163-220.us-east-2.compute.amazonaws.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.darkness.services%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.tamersunion.org%3A443%2Fannounce&tr=https%3A%2F%2Ftracker.gcrenwp.top%3A443%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fu.peer-exchange.download%3A6969%2Fannounce&tr=udp%3A%2F%2Fu6.trakx.crim.ist%3A1337%2Fannounce&tr=udp%3A%2F%2Fmartin-gebhardt.eu%3A25%2Fannounce&tr=udp%3A%2F%2Ftracker.tryhackx.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fwww.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftk2v6.trackerservers.com%3A8080%2Fannounce&tr=udp%3A%2F%2Ftracker.breizh.pm%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.dstud.io%3A6969%2Fannounce&tr=udp%3A%2F%2Fepider.me%3A6969%2Fannounce&tr=https%3A%2F%2Fwww.peckservers.com%3A9443%2Fannounce&tr=udp%3A%2F%2Fttk2.nbaonlineservice.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fretracker.lanta.me%3A2710%2Fannounce&tr=http%3A%2F%2Fbvarf.tracker.sh%3A2086%2Fannounce&tr=udp%3A%2F%2Fseedpeer.net%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.gmi.gd%3A6969%2Fannounce&tr=udp%3A%2F%2Ftk2.trackerservers.com%3A8080%2Fannounce&tr=udp%3A%2F%2Fretracker01-msk-virt.corbina.net%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.io%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.demonoid.ch%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.birkenwald.de%3A6969%2Fannounce&tr=http%3A%2F%2Fopen-v6.demonoid.ch%3A6969%2Fannounce&tr=udp%3A%2F%2Fu4.trakx.crim.ist%3A1337%2Fannounce&tr=udp%3A%2F%2Frun.publictracker.xyz%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen-tracker.demonoid.ch%3A6969%2Fannounce&tr=https%3A%2F%2Ftrackers.run%3A443%2Fannounce&tr=http%3A%2F%2Ftracker.dump.cl%3A6969%2Fannounce&tr=udp%3A%2F%2Fp2p.publictracker.xyz%3A6969%2Fannounce&tr=udp%3A%2F%2Fodd-hd.fr%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker.cloudit.top%3A443%2Fannounce&tr=udp%3A%2F%2Fretracker.hotplug.ru%3A2710%2Fannounce&tr=https%3A%2F%2Fpybittrack.retiolus.net%3A443%2Fannounce&tr=http%3A%2F%2Fisk.richardsw.club%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.filemail.com%3A6969%2Fannounce&tr=https%3A%2F%2Ftracker1.520.jp%3A443%2Fannounce&tr=https%3A%2F%2Ftracker2.ctix.cn%3A443%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=https%3A%2F%2Ftracker1.ctix.cn%3A443%2Fannounce&tr=https%3A%2F%2Ft.peer-exchange.download%3A443%2Fannounce&tr=udp%3A%2F%2Ftracker-us.silksa.co.za%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.skynetcloud.site%3A6969%2Fannounce&tr=udp%3A%2F%2Fwepzone.net%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.silksa.co.za%3A6969%2Fannounce&tr=udp%3A%2F%2Ftamas3.ynh.fr%3A6969%2Fannounce&tr=udp%3A%2F%2Fjutone.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftk1.trackerservers.com%3A8080%2Fannounce&tr=https%3A%2F%2Ftracker.pmman.tech%3A443%2Fannounce&tr=http%3A%2F%2Ftracker.mywaifu.best%3A6969%2Fannounce&tr=http%3A%2F%2Fbt1.archive.org%3A6969%2Fannounce&tr=http%3A%2F%2Fbt2.archive.org%3A6969%2Fannounce`,
    poster: posterUrl,
    width: '100%',
    height: '100%',
    imdbId: imdbId,
    lang: 'pt',
    userLang: 'pt',
    header: true,
    features: {
      autoSubtitles: true,
      continue: true,
      title: false,
      p2pProgress: false,
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
