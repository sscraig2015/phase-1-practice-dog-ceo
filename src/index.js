document.addEventListener('DOMContentLoaded', () => {
    
    let dogUL = document.getElementById('dog-breeds')
    let dogImageContainer = document.getElementById('dog-image-container')

    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(resp => resp.json())
        .then(function(jsonObject){
            let arrOfDogURLs = jsonObject.message
            arrOfDogURLs.forEach(url => {
                dogImageContainer.innerHTML += `<img src="${url}"/>`
            })
        })
    makeFetch()
        .then(resp => {
            let dogBreedsArray = Object.keys(resp.message)
            dogBreedsArray.forEach(breed => {
                dogUL.innerHTML += `<li data-info="breed">${breed}</li>`
            })
        })

        dogUL.addEventListener('click', (event) => {
            if (event.target.dataset.info === 'breed') {
                event.target.style.color = "green"
            }
        })
        
    let dogSelect = document.getElementById('breed-dropdown')
    dogSelect.addEventListener('change', (event) => {
        makeFetch()
        .then(res => {
            let dogBreedsArr = Object.keys(res.message)
            
            let filteredArray = dogBreedsArr.filter(breed => {
                return breed.startsWith(event.target.value)
            })

            dogUL.innerHTML = ""
            filteredArray.forEach((breed) => {
                dogUL.innerHTML += `<li data-info="breed">${breed}</li>`
            })
    
        })
    })
    



   //End of DOM listener
})

function makeFetch() {
    return fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
}