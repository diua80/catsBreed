const API_KEY = "live_7gmkYXXbt2NTLSO5ORqlwCtiezgaWS1vWMGBaD9WSm1I3zOd5BVIwWlWk3wYT2zi";
const BREEDS_LIST = "https://api.thecatapi.com/v1/breeds";//тут повертає масив з усіма об'єктами-порід..
const CAT_DATA = "https://api.thecatapi.com/v1/images/search";//додай ще через ? breed_ids, напр. beng, а потім через & апі-кей..

export function fetchBreeds() {
    return fetch(`${BREEDS_LIST}`).then((res) => {
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return res.json();
    });
    
}
export function fetchCatByBreed(breedId) {
    return fetch(`${CAT_DATA}?breed_ids=${breedId}&api_key=${API_KEY}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json();
        });
}



//  {
//         "weight": {
//             "imperial": "7  -  10",
//             "metric": "3 - 5"
//         },
//         "id": "abys",
//         "name": "Abyssinian",
//         "cfa_url": "http://cfa.org/Breeds/BreedsAB/Abyssinian.aspx",
//         "vetstreet_url": "http://www.vetstreet.com/cats/abyssinian",
//         "vcahospitals_url": "https://vcahospitals.com/know-your-pet/cat-breeds/abyssinian",
//         "temperament": "Active, Energetic, Independent, Intelligent, Gentle",
//         "origin": "Egypt",
//         "country_codes": "EG",
//         "country_code": "EG",
//         "description": "The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.",
//         "life_span": "14 - 15",
//         "indoor": 0,
//         "lap": 1,
//         "alt_names": "",
//         "adaptability": 5,
//         "affection_level": 5,
//         "child_friendly": 3,
//         "dog_friendly": 4,
//         "energy_level": 5,
//         "grooming": 1,
//         "health_issues": 2,
//         "intelligence": 5,
//         "shedding_level": 2,
//         "social_needs": 5,
//         "stranger_friendly": 5,
//         "vocalisation": 1,
//         "experimental": 0,
//         "hairless": 0,
//         "natural": 1,
//         "rare": 0,
//         "rex": 0,
//         "suppressed_tail": 0,
//         "short_legs": 0,
//         "wikipedia_url": "https://en.wikipedia.org/wiki/Abyssinian_(cat)",
//         "hypoallergenic": 0,
//         "reference_image_id": "0XYvRd7oD"
//     } один з об'єктів, з переліку усіх об'єктів-порід

const promise = fetch("https://api.thecatapi.com/v1/breeds")
    .then((res) => {
    console.log(res);
        if (!res.ok) {
            throw new Error("Помилка, яку ми примусово закидуємо у catch");//тут ми створили екземпляр класу Помилка,
        // щоб вона зловилась у операторі catch. Навіщо!! а для того, що буває відповідь від сервера є, але вона
        // для нас, щоб обробляти її у програмі надалі, не годиться! ну, немає в цій відповіді даних, але сервер відповів і помилка не ловиться!
        //І коли статус перевіриться і там буде status=false то викидання моєї самописної помилки автоматично переводить стан промісу у regected(відхилено)
        // А коли стан реджектід, то керування одразу переходить до catch! Тоді вже Кетч його ловить і виводить до консолі!
        }
        return res.json()
    })
    .then((res)=>console.log(res))
    .catch(err=>console.error(err))//тут зловиться наша самописна помилка..
//console.log(promise); виведе promise(pending), тому що двіжок не може його вивести у синхронний код.. джава скрипт синронна мова, а проміс
//  - це асинхронщина!
//якщо подивитись у консоль після виводу res, то там буде об'єкт у властивості body якого зберігаються данні по запиту, але ми їх не зможемо
// продивитись бо це специфічний об'єкт саме класу "Promise", і його зазначено у полі Prototype.. І саме у полі прототайп є доступний метод, який
// треба застосувати, щоб перевести формат json у джава скриптовий об'єкт для подальшого опрацювання..
//ЦІКАВО! тут важливо усвідомити, що ми отримуємо від сервера об'єкт типу Response! це НЕ об'єкт типу джейсон - це об'єкт типу Response і його
// не можна засовувати у методі JSON.parse, бо буде помилка!
// тут дуже важливо самке використовувати наданий метод json(), що зазначено у прототипі! Бо саме він, цей метод дістає об'єкт-відповідь класу
// Response спочатку з поля body, а тоді розпарсює його до належного вигляду!
//Цікаво, що в одному then ти робиш json(), а в другому виводиш у консоль.. в одному не виходить..
