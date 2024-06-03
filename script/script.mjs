
let form = document.getElementById("user-form")
let container = document.createElement('div')
document.body.appendChild(container);

container.classList.add("container")
const api_key = "live_e1BMmszfSiB6rEo5FRqldauZS59VNCYcBnGzi1ukunpJVGk7UjhXMTDijkR1VdHp"

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let limit =  event.target.elements["limit"].value;
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
        for(let image of imagesData){
            console.log(`Image URL: ${image.url}`); 
            let img = document.createElement('img')
            img.src = image.url;
            img.alt = "Cat Image";
            img.style.width = '200px'; 

            container.appendChild(img);


        }

    } catch (error) {
        console.error(`Failed to get data`, error)
    }

}

