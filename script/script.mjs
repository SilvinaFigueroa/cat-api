
let form = document.getElementById("user-form")
let container = document.createElement('div')
document.body.appendChild(container);
let favBtn = document.createElement('button')

container.classList.add("container")
const api_key = "live_e1BMmszfSiB6rEo5FRqldauZS59VNCYcBnGzi1ukunpJVGk7UjhXMTDijkR1VdHp"

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let limit = event.target.elements["limit"].value;
    let apiUrl = `https://api.thecatapi.com/v1/images/search?limit=${limit}`;

    getData(apiUrl);
})

async function getData(apiUrl) {
    try {
        const result = await fetch(apiUrl, {
            headers: {
                'x-api-key': api_key
            }
        })
        const data = await result.json()
        let imagesData = data;

        console.log(imagesData)

        container.innerHTML = ""; // reset the container
        for (let image of imagesData) {
            console.log(`Image URL: ${image.url}`);
            let imgContainer = document.createElement('figure');
            let caption = document.createElement("figcaption")

            caption.classList.add("figure-caption")

            // check if breed exist for that cat
            if (image.breeds && image.breeds.length > 0 && image.breeds[0].name) {
                caption.textContent = `Breed: ${image.breeds[0].name};`
            } else {
                caption.textContent = "Breed: cat!";
            }

            imgContainer.classList.add("img-container");
            imgContainer.style.backgroundImage = `url(${image.url})`;

            imgContainer.appendChild(favBtn);
            imgContainer.appendChild(caption);
            container.appendChild(imgContainer);

        }

    } catch (error) {
        console.error(`Failed to get data`, error)
    }

}

