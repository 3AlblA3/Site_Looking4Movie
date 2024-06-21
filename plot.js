let section = document.getElementById("section")

let URL = "https://www.omdbapi.com/";

let key = "da9c0093";

let getMovieId = window.localStorage.getItem('movieID');

movieIdParsed = JSON.parse(getMovieId);

if (movieIdParsed==null){
    section.innerHTML =`<h2 class="main__section__h2">Your cart is empty!<h2>`
}else{
    section.innerHTML = `
<article class="main__section__cart__container">
    <img class="main__section__cart__container__img" src="${movieIdParsed.Poster}">
    <div class="main__section__cart__container__aside">
        <h3>${movieIdParsed.Title}</h3>
        <p class="main__section__cart__p">Plot: ${movieIdParsed.Plot}</p>
        <button class="main__section__cart__container__aside__button" id="vider" onclick="vider()">Delete movie from local storage  </button>
    </div>
</article>
`
}

function vider(){
    window.localStorage.removeItem('movieID');
    section.innerHTML=`<h2 class="main__section__h2">Look for another movie!<h2>`
}

const form = document.querySelector('form');

async function research(){

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        section.innerHTML=""

        let search = document.getElementById("name").value;
      
        let regex = new RegExp("[!@#\$%\^\&*\)\(+=._-]");
        let resultat = regex.test(search);

        if (resultat == true){
            alert("merci d'entrer un titre valide")
        }else if(search === ""){
            alert("Merci d'entrer votre recherche")
        }else{
            let api = URL + "?s=" + search + "&apikey=" + key;
            async function getApi(){
                await fetch(api)
                .then(response => response.json())
                .then(movies => { 
                    let myMovie = movies.Search;
                    myMovie?.sort((a, b) => (b.Year > a.Year ? 1 : -1))
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


