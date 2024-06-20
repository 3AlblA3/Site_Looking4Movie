let section = document.getElementById("section")

// URLSearchParams sert à entrer un bout d'URL, ici le window.location.search remplace notre URL présente dans notre navigateur


//Récupération des pièces eventuellement stockées dans le localStorage


//Ici on récupére le bout de notre URL qui sert d'ID pour notre film à afficher

let URL = "https://www.omdbapi.com/";

let key = "da9c0093";

let getMovieId = window.localStorage.getItem('movieID');

movieIdParsed = JSON.parse(getMovieId);

console.log(movieIdParsed)

if (movieIdParsed==null){
    section.innerHTML =`<h2 class="main__section__h2">Your cart is empty!<h2>`
}else{
    section.innerHTML = `
<article class="main__section__cart__container">
    <img class="main__section__cart__container__img" src="${movieIdParsed.Poster}">
    <div class="main__section__cart__container__aside">
        <h3>${movieIdParsed.Title}</h3>
        <button class="main__section__cart__container__aside__button" id="vider" onclick="vider()">Delete movie from cart</button>
    </div>
</article>
`
}

function vider(){
    window.localStorage.removeItem('movieID');
    section.innerHTML=`<h2 class="main__section__h2">Your cart is empty!<h2>`
}

const form = document.querySelector('form');

function research(){

    form.addEventListener("submit", (event) => {
        // event.preventDefault pour empecher le rechargement de la page //
        event.preventDefault();
        console.log("Il n'y a pas eu de rechargement de page");

        section.innerHTML=""
        // Cette petite ligne sert à cleaner la précedente recherche au moment d'en créer une autre

        let search = document.getElementById("name").value;
      
        let regex = new RegExp("[!@#\$%\^\&*\)\(+=._-]");
        let resultat = regex.test(search);
        console.log(resultat);

        if (resultat == true){
            alert("merci d'entrer un titre valide")
        }else if(search === ""){
            alert("Merci d'entrer votre recherche")
        }else{
            console.log(search)
            let api = URL + "?s=" + search + "&apikey=" + key;
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
                .catch(error => {console.error(error, "error")
                    alert("ce film n'existe pas")
                });
            }
          getApi();
            
        }
    })
}

research()


