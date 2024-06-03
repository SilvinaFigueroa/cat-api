import { getData} from './functions.mjs';

let form = document.getElementById("user-form")
let container = document.createElement('div')
document.body.appendChild(container);

container.classList.add("container")

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let limit = event.target.elements["limit"].value;
    let apiUrl = `https://api.thecatapi.com/v1/images/search?limit=${limit}`;

    getData(apiUrl, container);
})



 
