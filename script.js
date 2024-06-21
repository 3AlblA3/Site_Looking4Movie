const form = document.querySelector('form');

let URL = "https://www.omdbapi.com/";

let key = "da9c0093";

let section = document.getElementById("section")

section.innerHTML=`
    <h2 class="main__section__h2">Please enter your movie</h2>
`

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













