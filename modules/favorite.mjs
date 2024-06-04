

async function addFavorite(imageId, user) {
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
        // window.alert(`Cat added to your favorites!`);
    } catch (error) {
        console.error('Error:', error);
    }
}
