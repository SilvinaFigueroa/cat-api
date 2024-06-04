const apiKey = "live_e1BMmszfSiB6rEo5FRqldauZS59VNCYcBnGzi1ukunpJVGk7UjhXMTDijkR1VdHp"


export async function getData(apiUrl, container, limit) {
    container.innerHTML = ""; // reset the container

    for (let i = 0; i < limit; i++) {
        try {
            const result = await fetch(apiUrl, {
                headers: {
                    'x-api-key': apiKey
                }
            })
            const data = await result.json()
            let imagesData = data;

            console.log(`Image URL: ${imagesData.url}`);

            for (let image of imagesData) {
                console.log(`Image URL: ${image.url}`);

                // use figure caption to show some info of each pic
                let imgContainer = document.createElement('figure');
                let caption = document.createElement("figcaption")

                caption.classList.add("bg-primary", "badge", "rounded-pill")
                caption.style.marginLeft = "5px"
                caption.style.color = "white"

                // create heart icon
                let icon = document.createElement('i');
                icon.classList.add("fa", "fa-heart-o", "heart-icon");
                

                // toggle classes for icon using jQuery
                $(icon).click(function () {
                    $(this).toggleClass("fa-heart-o fa-heart");
                });

                // add event listener to the favBtn on each image
                icon.addEventListener('click', () => {
                    addFavorite(image.id,'silvina_324')     
                })

                imgContainer.classList.add("img-container");
                imgContainer.style.backgroundImage = `url(${image.url})`;

                // add elements to the container
                // imgContainer.appendChild(caption);
                imgContainer.append(caption,icon);

                // add image to container-grid
                container.appendChild(imgContainer);

                // Double check if the breed exist for the cat
                if (image.breeds && image.breeds.length > 0 && image.breeds[0].name) {
                    let breed = image.breeds[0].name
                    caption.textContent = `${breed}`
                } else {
                    caption.textContent = "a cat!";
                }
            }

        } catch (error) {
            console.error(`Failed to get data`, error)
        }
    }

}



