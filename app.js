const ENV = "production";
let searchBar = document.getElementById('searchBar');
let searchButton = document.getElementById('searchButton');
let createButton = document.getElementById('inputButton');
let gameInfo = document.getElementById('gameBar');
let ratingInfo = document.getElementById('ratingBar');
let systemInfo = document.getElementById('systemBar');

//app.use(express.static('public'));


let URL = ENV == "production" ? 'https://game-list.onrender.com/api/games' : 'http://localhost:3000/api/games';

searchButton.addEventListener("click", () => {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => showData(data));
})
createButton.addEventListener("click", event => {
    var systemId;
    var tempSystem = systemInfo.value
    var systemCompare = tempSystem.toLowerCase();
    systemCompare == 'playstation' ? systemId = 1 :
    systemCompare == 'xbox' ? systemId = 2 :
    systemCompare == 'switch' ? systemId = 3 :
    systemCompare == 'pc' ? systemId = 4 : console.error('incorrect input');
    var data = {game: `${gameInfo.value}`, rating: `${ratingInfo.value}`, system_id: systemId}
    fetch(`${URL}games/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response)
    .then((data) => {
        console.log('Success:', data)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})
function showData(data) {
    for(let i = 0; i < data.length; i++){
        divCreate(data[i].game, data[i].system, data[i].rating)
    }
}

function divCreate(dataName, dataSystem, dataRating) {
    let dataDiv = document.getElementById("videoGames")
    let nameInfo = document.createElement('h1');
    nameInfo.textContent = `${dataName}`;
    let systemInfo = document.createElement('h2');
    systemInfo.textContent = `${dataSystem}`;
    let ratingInfo = document.createElement('h3');
    ratingInfo.textContent = `${dataRating}`;
    dataDiv.appendChild(nameInfo);
    dataDiv.appendChild(systemInfo);
    dataDiv.appendChild(ratingInfo);
}
    //containerDiv.appendChild(nameInfo, systemInfo, ratingInfo);
    //containerDiv.appendChild(newDiv);

