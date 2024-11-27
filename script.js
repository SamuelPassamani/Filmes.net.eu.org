// Referências aos elementos HTML
var player = document.getElementById("player");
var loading = document.getElementById("loading");

// Esconde o player inicialmente e exibe a mensagem de carregamento
player.style.display = "none";
loading.style.display = "block";

// Inicia o player assim que a página é carregada
window.onload = function () {
  initPlayer();
};

// Função para inicializar o player com Webtor
function initPlayer() {
  window.webtor = window.webtor || [];
  window.webtor.push({
    id: "player", // ID do contêiner do player
    width: "100%",
    lang: "pt",
    userLang: "pt",
    magnet:
      "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel", // Link do torrent
    features: {
      autoSubtitles: true, // Ativar legendas automáticas
      continue: true, // Continuar de onde parou
      title: false, // Ocultar título
      p2pProgress: false, // Desativar progresso P2P
      subtitles: true, // Exibir opção de legendas
      settings: false, // Ocultar configurações
      fullscreen: true, // Habilitar fullscreen
      playpause: true, // Mostrar botão de play/pause
      currentTime: true, // Mostrar tempo atual
      timeline: true, // Exibir timeline
      duration: true, // Mostrar duração
      volume: true, // Permitir controle de volume
      chromecast: true, // Ativar suporte ao Chromecast
      embed: false // Desativar opção de incorporar
    },
    // Callback para eventos do player
    on: function (e) {
      if (e.name === window.webtor.INITED) {
        e.player.play(); // Inicia a reprodução automaticamente
        player.style.display = "block"; // Exibe o player
        loading.style.display = "none"; // Esconde a mensagem de carregamento
      }
      // Detecta quando o fullscreen é ativado ou desativado
      if (e.name === window.webtor.FULLSCREEN) {
        handleFullscreen(e.isFullscreen);
      }
    }
  });
}

// Função para gerenciar a exibição da imagem no modo fullscreen
function handleFullscreen(isFullscreen) {
  const imagemTopo = document.getElementById("imagem-topo-link");

  if (isFullscreen) {
    // Adiciona a imagem ao contêiner do player ou ao fullscreenElement
    const fullscreenElement = document.fullscreenElement || document.documentElement;
    fullscreenElement.appendChild(imagemTopo);
  } else {
    // Retorna a imagem ao corpo do documento
    document.body.appendChild(imagemTopo);
  }
}
