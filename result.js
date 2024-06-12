let params = new URLSearchParams (window.location.search);
let movieID = "?i=" + params.get("id")
console.log(movieID)

let URL = "https://www.omdbapi.com/";

let key = "&apikey=da9c0093";

let api = URL + movieID + key

console.log(api)

fetch(api)
.then(response => response.json())
.then(data => {console.log(data)
    let html =`
    <article class="main__section__article">
        <h2 class="main__section__article__h2">${data.Title}<h2>
        <img class="main__section__article__img" src="${data.Poster}">
        <h3 class="main__section__article__h3">${data.Year}</h3>
        <h3 class="main__section__article__h3">${data.Director}</h3>
        <h5 class="main__section__article__h5">${data.Actors}</h5>
        <p class="main__section__article__p">${data.Plot}</p>
    </article>`;
    document.getElementById("section").innerHTML += html;
})
.catch(error => console.error(error, "error")); 