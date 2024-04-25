// Settings button
getLocation();
console.log('loader');
let settingsButton=document.getElementById('nav_settings');
console.log(settingsButton); 
settingsButton.addEventListener('click', ()=> {
    showSettings()
    
})
// getLocation function to get user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, positionError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// showPosition function to display user's location
function showPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    getUserReadableLocation(lat, long);
    getPollenData(lat, long);
}

// positionError function to handle geolocation error
function positionError() {
    console.log("Error getting geolocation.");
}

// getUserReadableLocation function to get readable location
function getUserReadableLocation(lat, long) {
    const apiKey = "65fbef1fcd29c689065623miw1a38c3";
    const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            buildLocationName(data.address.city);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// buildLocationName function to display location name
function buildLocationName(myCity) {
    const weatherApp = document.getElementById("app"); 
    weatherApp.innerHTML = `<h1>${myCity}</h1>`;
}

// getPollenData function to get pollen data
function getPollenData(lat, long) {
    const timeZone = "Europe%2FBerlin";
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${long}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=${timeZone}&forecast_days=1`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            pollenDataStructure(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// pollenDataStructure function to structure pollen data
function pollenDataStructure(data) {
    const myViewData = [data];
    buildPollenView(myViewData);
}

// buildPollenView function to display pollen data
// Function to build pollen view with images
function buildPollenView(viewData) {
    const myDisplayElement = document.getElementById("PollenData");
    const myCurrentData = viewData[0];
    let myCurrentHTML = `
        <h2>Pollental</h2>
        <ul>
            <div class="line_br"></div>
            <li><img src="./assets/img/birk.png" alt=""> el ${myCurrentData.current.alder_pollen} ${myCurrentData.current_units.alder_pollen}</li>
            <div class="line_br"></div>
            <li><img src="./assets/img/birk.png" alt=""> birk ${myCurrentData.current.birch_pollen} ${myCurrentData.current_units.birch_pollen}</li>
            <div class="line_br"></div>
            <li><img src="./assets/img/birk.png" alt=""> græs ${myCurrentData.current.grass_pollen} ${myCurrentData.current_units.grass_pollen}</li>
            <div class="line_br"></div>
            <li><img src="./assets/img/birk.png" alt=""> bynke ${myCurrentData.current.mugwort_pollen} ${myCurrentData.current_units.mugwort_pollen}</li>
            <div class="line_br"></div>
            <li><img src="./assets/img/birk.png" alt=""> oliven ${myCurrentData.current.olive_pollen} ${myCurrentData.current_units.olive_pollen}</li>
            <div class="line_br"></div>
            <li><img src="./assets/img/birk.png" alt=""> ambrosie ${myCurrentData.current.ragweed_pollen} ${myCurrentData.current_units.ragweed_pollen}</li>
        </ul>
    `;
    myDisplayElement.innerHTML = myCurrentHTML;
}

const myDisplayElement = document.getElementById("PollenData");

//showSettings function when clicked, shows ONLY Settings
function showSettings() {

    myDisplayElement.innerHTML = "Settings";

}

//WHEN CLICKED HOME BUTTON IT GOES BACK TO MY LANDING PAGE AWAY FROM SETTINGS
const homeElement = document.getElementById("nav_home");

homeElement.addEventListener("click", function() {
    
       homeLoading()
    
        getLocation();
    
        
});

function homeLoading() {
    myDisplayElement.innerHTML="<h1>Loading...</h1>";
}

