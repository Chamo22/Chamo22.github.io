// let ts = "00565901";
// let publicKey = "044737b2bd6f860012a4bb2e7c0047a5";
// let hashVal = "56f2435390e7766ae6db757a29ff7563";

let input = document.getElementById('input-box');
let button = document.getElementById('submit-button');
let showContainer = document.getElementById('show-container');
let listContainer = document.querySelector('.list');
//Datos API
let ts = '00565901'; //new Date().getTime();
let publicKey = '044737b2bd6f860012a4bb2e7c0047a5';
let hashVal = '56f2435390e7766ae6db757a29ff7563';

function displayWords(value) {
    input.value = value;
    removeElements();
}

input.addEventListener("keyup", async () => {
    removeElements();
    if (input.value.length < 4) {
    return false;
    };

    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&nameStartsWith=${input.value}`;
    const response = await fetch(url);
    const jsonData = await response.json();

    jsonData.data["results"].forEach((results) => {
        let name = results.name;
        let div = document.createElement("div");
        div.style.cursor = "pointer";
        div.classList.add("autocomplete-items");
        div.setAttribute("onclick","displayWords('" + name + "')");
        let word = `<b> + name.substr(0, input.value.length) + </b>`;
        word += name.substr(input.value.length);
        div.innerHTML = `<p class="item">${name}</p>`
        listContainer.appendChild(div);
    })
});

function removeElements() {
    listContainer.innerHTML = "";
}

async function getResults() {
    if (input.value.trim().length < 1) {
        alert("Input cannot be blank");
    } 
    else {
        showContainer.innerHTML = "";
        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&name=${input.value}`; 
        const response = await fetch(url);
        const jsonData = await response.json();
        jsonData.data["results"].forEach(element => {
            showContainer.innerHTML += `<div class="card-container">
            <div class="container-character-image">
            <img src="${element.thumbnail.path + "." + element.thumbnail.extension}">
            </div>
            <div class="character-name">${element.name}</div> 
            <div class="character-description">${element.description}</div>
            </div>`;
        });
    }
}

button.addEventListener("click", getResults);

window.onload = () => {
    getResults();
};

