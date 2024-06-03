const apiKey = "live_e1BMmszfSiB6rEo5FRqldauZS59VNCYcBnGzi1ukunpJVGk7UjhXMTDijkR1VdHp"

export async function getData(apiUrl, container) {
    try {
        const result = await fetch(apiUrl, {
            headers: {
                'x-api-key': apiKey
            }
        })
        const data = await result.json()
        let imagesData = data;

        console.log(imagesData)

        container.innerHTML = ""; // reset the container
        for (let image of imagesData) {
            console.log(`Image URL: ${image.url}`);
            // use figure caption to show some info of each pic
            let imgContainer = document.createElement('figure');
            let caption = document.createElement("figcaption")
            caption.classList.add("figure-caption")

            let favBtn = document.createElement('button')

            favBtn.textContent = "Add to Favorites";
            favBtn.classList.add("btn-success");

            // add event listener to the favBtn on each image
            favBtn.addEventListener('click', () => {
                addFavorite(image.id,'silvina_324')    
            })

            // check if breed exist for that cat
            if (image.breeds && image.breeds.length > 0 && image.breeds[0].name) {
                caption.textContent = `Breed: ${image.breeds[0].name};`
            } else {
                caption.textContent = "Breed: cat!";
            }

            imgContainer.classList.add("img-container");
            imgContainer.style.backgroundImage = `url(${image.url})`;

            // add elements to the container
            imgContainer.appendChild(favBtn);
            imgContainer.appendChild(caption);
            container.appendChild(imgContainer);

        }

    } catch (error) {
        console.error(`Failed to get data`, error)
    }

}

async function addFavorite(imageId,user){
    const apiUrl = "https://api.thecatapi.com/v1/favourites";

    const body = {
        image_id: imageId,
        sub_id: user,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        window.alert(`Cat added to your favorites!`);
    } catch (error) {
        console.error('Error:', error);
    }
}
