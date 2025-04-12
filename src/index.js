import { getCatBreedsData } from "./cat-api";
const refs = {
    breedSelect: document.querySelector(".breed-select"),
    infoContain: document.querySelector(".cat-info"),
}
let allBreeds = [];
getCatBreedsData()
    .then(breeds => {
        allBreeds = breeds;
        const optionsMarkup = breeds
            .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
            .join('');
        refs.breedSelect.insertAdjacentHTML('beforeend', optionsMarkup);
        const selectedBreed = refs.breedSelect.value;        
        renderCatInfo(selectedBreed);
        refs.breedSelect.addEventListener("change", (e) => {
            const selectedBreed = e.target.value;
            renderCatInfo(selectedBreed);
            console.log(selectedBreed);
        })
    })
    .catch(error => {
        console.error("Помилка при завантаженні", error);
    });

function renderCatInfo(selectedBreed) {
    const breed = allBreeds.find(breed => breed.id === selectedBreed);
    if (!breed) return;
    const markup = `
        <h2>${breed.name}</h2>
        <img src="${breed.image?.url || ''}" alt="${breed.name}" width="300">
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
        <p>${breed.description}</p>`;
    refs.infoContain.innerHTML = markup;    
    }

