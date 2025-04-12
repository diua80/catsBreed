export function getCatBreedsData() {
    return fetch("https://api.thecatapi.com/v1/breeds", {
        headers: {
            "x-api-key": "live_7gmkYXXbt2NTLSO5ORqlwCtiezgaWS1vWMGBaD9WSm1I3zOd5BVIwWlWk3wYT2zi"
        }
    })
        .then((resp) =>{
            if (!resp.ok) { 
                throw new Error(resp.statusText)
            }
            return resp.json();
        });
}
