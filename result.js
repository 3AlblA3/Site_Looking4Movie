let params = new URLSearchParams (window.location.search);

let movieID = "?i=" + params.get("id")

let URL = "https://www.omdbapi.com/";

let key = "da9c0093";

let filmURL = URL + movieID + "&apikey=" + key

let section = document.getElementById("section")

//:::::::: Récupérer le résultat de notre recherche :::::::: //

 async function getFilm(){  

    await fetch(filmURL)    
    .then(response => response.json())
    .then(data => {

        // ::::::::: Afficher dans le DOM :::::::::: //

        let html =
        `
        <article class="main__section__article__result">
            <h2 class="main__section__article__h2">${data.Title}<h2>
            <img class="main__section__article__result__img" src="${data.Poster}">
            <h3 class="main__section__article__h3">${data.Year}</h3>
            <h3 class="main__section__article__h3">Director: ${data.Director}</h3>
            <h5 class="main__section__article__h5">Actors: ${data.Actors}</h5>
            <p class="main__section__article__result__p">Genre: ${data.Genre}</p>
            <a href="plot.html"><button class="main__section__article__button" id="button">See the plot</button><a>
        </article>
        `;

        document.getElementById("section").innerHTML += html;

        // :::::::: Envoyer les données dans le local storage sur le click et changer de page ::::::::: //

        let button = document.getElementById("button")

        button.addEventListener("click", (event) =>{
            event.preventDefault();
            let movieIDStringed = JSON.stringify(data);
            localStorage.setItem("movieID", movieIDStringed);
            window.location.replace("plot.html");
        })
        
    })
    .catch(error => console.error(error, "error")); 
}

getFilm()

const form = document.querySelector('form');

//:::::::: la Fonction de recherche de film du Header :::::::: //

async function research(){
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        section.innerHTML=""
        let search = document.getElementById("name").value;

        //::::::::: Mise en place des règles de validation ::::::::::: //
        
        let regex = new RegExp("[!@#\$%\^\&*\)\(+=._-]")
        let resultat = regex.test(search);
        if (resultat == true){
            alert("merci d'entrer un titre valide")
        }else if(search === ""){
            alert("Merci d'entrer votre recherche")
        }else{
        let api = URL + "?s=" + search + "&apikey=" + key;

        // ::::::::::::: Afficher les résultats de notre recherche ::::::::::::: /// 
            
        async function getApi(){
            
            await fetch(api)
            .then(response => response.json())
            .then(movies => { 
                let myMovie = movies.Search;
                myMovie?.sort((a, b) => (b.Year > a.Year ? 1 : -1))

                //:::: Boucle pour afficher chaque article :::://
        
                for(let i of myMovie){
                    let html =""
                    if (i.Type == "game"){
                        html =""
                    }else{
                        html = `
                            <a href="result.html?id=${i.imdbID}" id="${i.imdbID}">
                                <article class="main__section__article">
                                    <h2 class="main__section__article__h2">${i.Title}<h2>
                                    <h3 class="main__section__article__h3">${i.Year}</h3>
                                    <img class="main__section__article__img" src="${i.Poster}">
                                </article>
                            </a>
                        `;
                    }
                    section.innerHTML += html;
                }
            })
            .catch(error => {console.error(error, "error")
                alert("ce film n'existe pas")
            });
        }
        getApi();
        }
    })
}
research()
