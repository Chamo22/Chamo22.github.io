const API_KEY = '397c1bd713d735816eacd1a7a749b35c';
const urls = [
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`,
    `https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${API_KEY}`,
    `https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year=2014&api_key=${API_KEY}`
]

window.addEventListener('DOMContentLoaded',()=>{
    const peticiones = urls.map(peticion=>fetch(peticion));
    Promise.all(peticiones)
    .then(values=>{
        return Promise.all(values.map(r=>r.json()))
    })
    .then(catalogos=>{
        const [catalogoUno,catalogoDos,catalogoTres] = catalogos;
        
        // Catalogo uno
        const destacadas = document.getElementById('destacadas');
        catalogoUno.results.forEach(pelicula => {
            const article = document.createElement('article');
            article.classList.add('pelicula');
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/original/'+pelicula.poster_path;
            article.append(img);
            destacadas.append(article);
        });
        // Catalogo dos
        const seriesTop = document.getElementById('top-10');
        catalogoDos.results.forEach(pelicula => {
            const article = document.createElement('article');
            article.classList.add('pelicula');
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/original/'+pelicula.poster_path;
            article.append(img);
            seriesTop.append(article);
        });
        // Catalogo tres
        const estrenos = document.getElementById('estrenos');
        catalogoTres.results.forEach(pelicula => {
            const article = document.createElement('article');
            article.classList.add('pelicula');
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/original/'+pelicula.poster_path;
            article.append(img);
            estrenos.append(article);

        });
    });
});

const scrollContainer = document.querySelector(".catalogo-series");
const scrollContent = document.querySelector(".peliculas");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

const scrollStep = 400; // Cantidad de píxeles a desplazar al hacer clic en una flecha

leftArrow.addEventListener("click", () => {
    console.log("click");
    scrollContent.scrollBy({
        top: 0,
        left: -scrollStep,
        behavior: "smooth"
    });
});

rightArrow.addEventListener("click", () => {
    console.log("click");
    scrollContent.scrollBy({
        top: 0,
        left: scrollStep,
        behavior: "smooth"
    });
});