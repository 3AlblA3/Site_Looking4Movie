let params = new URLSearchParams (window.location.search);

// URLSearchParams sert à entrer un bout d'URL, ici le window.location.search remplace notre URL présente dans notre navigateur

let movieID = "?i=" + params.get("id")
console.log(movieID)

//Ici on récupére le bout de notre URL qui sert d'ID pour notre film à afficher

let URL = "https://www.omdbapi.com/";

let key = "da9c0093";

let filmURL = URL + movieID + "&apikey=" + key

let section = document.getElementById("section")

console.log(filmURL)

function getFilm(){

    // Le fetch de l'api filmURL va nous ramener l'objet Json du film 

    fetch(filmURL)
    .then(response => response.json())
    .then(data => {console.log(data)
        let html =`
        <article class="main__section__article__result">
            <h2 class="main__section__article__h2">${data.Title}<h2>
            <img class="main__section__article__result__img" src="${data.Poster}">
            <h3 class="main__section__article__h3">${data.Year}</h3>
            <h3 class="main__section__article__h3">${data.Director}</h3>
            <h5 class="main__section__article__h5">${data.Actors}</h5>
            <p class="main__section__article__result__p">${data.Plot}</p>
            <p class="main__section__article__p">Runtime:${data.Runtime}</p>

        </article>`;
        document.getElementById("section").innerHTML += html;
    })
    .catch(error => console.error(error, "error")); 
}

getFilm()


const form = document.querySelector('form');

function research(){

    form.addEventListener("submit", (event) => {
        // event.preventDefault pour empecher le rechargement de la page //
        event.preventDefault();
        console.log("Il n'y a pas eu de rechargement de page");

        section.innerHTML=""
        // Cette petite ligne sert à cleaner la précedente recherche au moment d'en créer une autre

        let search = document.getElementById("name").value;

        let api = URL + "?s=" + search + "&apikey=" + key;

        // La variable api represente l'URL dans laquelle on va faire notre call api

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
                    // le href est très important car c'est lui qui va nous permettre d'ouvrir le lien en fonction de l'ID
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
                    section.innerHTML += html;
                }
            })
            .catch(error => console.error(error, "error"));
        }
      getApi();
    })
}

research()