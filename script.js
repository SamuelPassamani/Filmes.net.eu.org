jQuery(document).ready(function ($) {
  // Inicializando variáveis de controle de página
  let currentPage = 1;
  const moviesPerPage = 30;

  // Parâmetros de filtragem adicionais
  let quality = "";
  let minimumRating = "";
  let queryTerm = "";
  let genre = "";
  let sortBy = "date_added"; // Padrão: filmes mais recentes
  let orderBy = "";

  // Função para carregar filmes da API com parâmetros de filtragem
  function loadMovies(page = 1) {
    const apiUrl =
      `https://yts.mx/api/v2/list_movies.json?limit=${moviesPerPage}&page=${page}` +
      (quality ? `&quality=${quality}` : "") +
      (minimumRating ? `&minimum_rating=${minimumRating}` : "") +
      (queryTerm ? `&query_term=${queryTerm}` : "") +
      (genre ? `&genre=${genre}` : "") +
      (sortBy ? `&sort_by=${sortBy}` : "") +
      (orderBy ? `&order_by=${orderBy}` : "");

    $.get(apiUrl, function (response) {
      if (response.data && response.data.movies) {
        const movies = response.data.movies;
        const movieList = $(".movie-list .list");
        movieList.empty(); // Limpa a lista atual

        // Adiciona os filmes à lista
        movies.forEach((movie) => {
          const movieItem = `
            <li>
              <img src="${movie.medium_cover_image}" alt="${movie.title}">
              <div class="title">${movie.title_long}</div>
              <div class="genre">${movie.genres.join(", ")}</div>
            </li>
          `;
          movieList.append(movieItem);
        });

        $(".movie-list .title-bar .right .page-info").text(`Página ${page}`);
      } else {
        console.error("Nenhum filme encontrado");
      }
    });
  }

  // Função comum para atualizar filtros e recarregar filmes
  function updateFilterAndLoadMovies() {
    currentPage = 1; // Reseta para a primeira página
    loadMovies(currentPage);
  }

  // Carrega os filmes da primeira página ao carregar a página
  loadMovies(currentPage);

  // Lógica para carregar a próxima página
  $(".load-more").on("click", function () {
    currentPage++;
    loadMovies(currentPage);
  });

  // Lógica para alternar a sidebar
  $(".trigger-sidebar-toggle").on("click", function () {
    $("body").toggleClass("sidebar-is-open");
  });

  // Atualizando os filtros
  $(".quality-filter").on("change", function () {
    quality = $(this).val();
    updateFilterAndLoadMovies();
  });

  $(".rating-filter").on("change", function () {
    minimumRating = $(this).val();
    updateFilterAndLoadMovies();
  });

  $(".search-filter").on("input", function () {
    queryTerm = $(this).val();
    updateFilterAndLoadMovies();
  });

  $(".genre-filter").on("change", function () {
    genre = $(this).val();
    updateFilterAndLoadMovies();
  });

  $(".sort-by-filter").on("change", function () {
    sortBy = $(this).val();
    updateFilterAndLoadMovies();
  });

  $(".order-by-filter").on("change", function () {
    orderBy = $(this).val();
    updateFilterAndLoadMovies();
  });

  // Código para clique nas categorias
  $(".menu a").on("click", function (event) {
    event.preventDefault();

    const categoryMap = {
      Ação: "action",
      Aventura: "adventure",
      Animação: "animation",
      Biografia: "biography",
      Comédia: "comedy",
      Crime: "crime",
      Documentário: "documentary",
      Drama: "drama",
      Família: "family",
      Fantasia: "fantasy",
      História: "history",
      Terror: "horror",
      Música: "music",
      Mistério: "mystery",
      Romance: "romance",
      "Ficção Científica": "sci-fi",
      Suspense: "thriller",
      Guerra: "war",
      Faroeste: "western"
    };

    const selectedCategory = $(this).text();
    genre = categoryMap[selectedCategory] || "";
    updateFilterAndLoadMovies();
  });

  // -----------------------------------------
  // Configurações de Menu Superior
  // -----------------------------------------

  $(".top-menu a").on("click", function (event) {
    event.preventDefault();

    const menuOption = $(this).text();

    if (menuOption === "Início") {
      sortBy = "date_added"; // Mais recentes
    } else if (menuOption === "Populares") {
      sortBy = "download_count"; // Mais baixados
    } else if (menuOption === "Favoritos") {
      sortBy = "like_count"; // Mais curtidos
    }

    updateFilterAndLoadMovies();
  });

  // -----------------------------------------
  // Início do código para o Banner Rotativo
  // -----------------------------------------

  let bannerInterval;
  let currentIndex = 0;
  let bannerMovies = [];

  function setBanner(index) {
    const movie = bannerMovies[index];
    const detailsUrl = `https://yts.mx/api/v2/movie_details.json?imdb_id=${movie.imdb_code}&with_images=true&with_cast=true`;

    $.get(detailsUrl, function (detailsResponse) {
      const details = detailsResponse.data.movie;
      // Atualizando a imagem de fundo e os textos
      $(".featured-movie .cover").attr(
        "src",
        details.background_image_original
      );
      $(".featured-movie .info .title").text(details.title_long);
      $(".featured-movie .info .description").text(details.description_full);
    });
  }

  function startBannerRotation() {
    bannerInterval = setInterval(function () {
      currentIndex = (currentIndex + 1) % bannerMovies.length;
      setBanner(currentIndex);
    }, 5000);
  }

  function loadBannerMovies() {
    const apiUrl = `https://yts.mx/api/v2/list_movies.json?limit=10&sort_by=like_count`;
    $.get(apiUrl, function (response) {
      if (response.data && response.data.movies) {
        bannerMovies = response.data.movies;
        setBanner(currentIndex);
        startBannerRotation();
      } else {
        console.error("Nenhum filme encontrado para o banner");
      }
    });
  }

  loadBannerMovies();

  $(".featured-movie").on("mouseenter", function () {
    clearInterval(bannerInterval);
  });

  $(".featured-movie").on("mouseleave", function () {
    startBannerRotation();
  });

  $(".banner-prev").on("click", function () {
    clearInterval(bannerInterval);
    currentIndex =
      (currentIndex - 1 + bannerMovies.length) % bannerMovies.length;
    setBanner(currentIndex);
    startBannerRotation();
  });

  $(".banner-next").on("click", function () {
    clearInterval(bannerInterval);
    currentIndex = (currentIndex + 1) % bannerMovies.length;
    setBanner(currentIndex);
    startBannerRotation();
  });

  $(".banner-prev").attr("aria-label", "Imagem anterior do banner");
  $(".banner-next").attr("aria-label", "Próxima imagem do banner");
});
