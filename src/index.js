import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
const refs = {
    selectEl: document.querySelector(".breed-select"),
    divInfo: document.querySelector(".cat-info"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error")
}
refs.error.classList.add("hidden");
refs.selectEl.classList.add("hidden");
refs.loader.classList.remove("hidden");
refs.divInfo.classList.add("hidden");
fetchBreeds().then((breeds) => {
    console.log(breeds);
    refs.loader.classList.add("hidden");    
    refs.selectEl.classList.remove("hidden");
    breeds.forEach(breed => {
        const option = document.createElement("option");
        option.textContent = breed.name;
        option.value = breed.id;
        refs.selectEl.appendChild(option);
    });
    refs.selectEl.classList.remove("hidden");
    refs.loader.classList.add("hidden");
}).catch(err => {
    console.error(err);
    refs.loader.classList.add("hidden");
    refs.error.classList.remove("hidden");
});


refs.selectEl.addEventListener("change", () => {
    const breedId = refs.selectEl.value;

    refs.selectEl.classList.add("hidden");
    refs.divInfo.classList.add("hidden");
    refs.loader.classList.remove("hidden");

    fetchCatByBreed(breedId).then(data => {
        
        const catData = data[0];
        const breedData = catData.breeds[0];
        const markup = `
        <h2>${breedData.name}</h2>
        <img src="${catData.url}" alt="${breedData.name}">
        <p>Temperament ${breedData.temperament}</p>
        <p>Description ${breedData.description}</p>
        `;
        refs.divInfo.innerHTML = markup;

            refs.loader.classList.add("hidden");
            refs.selectEl.classList.remove("hidden");
            refs.divInfo.classList.remove("hidden");
    })
        .catch(err => {
            console.error(err);
            refs.error.classList.remove("hidden");
            refs.loader.classList.add("hidden");
    })
});


