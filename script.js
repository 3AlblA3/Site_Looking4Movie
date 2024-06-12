// API key: da9c0093

const form = document.querySelector('form');

let URL = "https://www.omdbapi.com/";

let key = "&apikey=da9c0093";

let button = document.getElementsByClassName("header__form__button")

// On peut remplacer l'eventListener par la fonction on click aussi dans le html

//Si on avait fait le onclick dans le html: function myFonction(){
//document.getElementbyId("myValue").value}

form.addEventListener("submit", (event) => {
    // event.preventDefault pour empecher le rechargement de la page //
    event.preventDefault();
    console.log("Il n'y a pas eu de rechargement de page");

    // "?s=" est la portion d'URL qui signigie la recherche dans l'API

    let search = "?s=" + document.getElementById("name").value;

    let api = URL + search + key;

    console.log(api);
    
    async function getApi(){
        await fetch(api)
        .then(response => response.json()) //NE PAS OUBLIER LES PARENTHESES APRES LE .JSON
        .then(movies => { 
            console.log(movies)
            let myMovie = movies.Search;
            //.Search est obligatoire car c'est l'indicateur du tableau d'objet qu'on reçoit en JSON
            myMovie?.sort((a, b) => (b.Year > a.Year ? 1 : -1))
            //Cette ligne sert à afficher les résultats par ordre croissant de date de sortie 
            for(let i of myMovie){
                let html = `
                <a href="result.html?id=${i.imdbID}" id="${i.imdbID}">
                    <article class="main__section__article">
                        <h2 class="main__section__article__h2">${i.Title}<h2>
                        <h3 class="main__section__article__h3">${i.Year}</h3>
                        <p id="imdbID" class="main__section__article__p">${i.imdbID}</p>
                        <img class="main__section__article__img" src="${i.Poster}">
                    </article>
                </a>
            `;
            // Le ?= après le href ouvre une dépendance de la page result
            document.getElementById("section").innerHTML += html;
            }
        })
        .catch(error => console.error(error, "error"));
    }
    getApi();

});













