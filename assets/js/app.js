// Function to create pollen settings form
function createPollenSettingsForm() {
    const form = document.createElement('form');
    form.id = 'pollenSettingsForm';

    // Add checkboxes for all pollen types
    const pollenTypes = ['alder_pollen', 'birch_pollen', 'grass_pollen', 'mugwort_pollen', 'olive_pollen', 'ragweed_pollen'];
    pollenTypes.forEach(pollenType => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" name="pollenType" value="${pollenType}"> ${pollenType.replace('_', ' ').toUpperCase()}`;
        form.appendChild(label);
        form.appendChild(document.createElement('br'));
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Save Settings';
    form.appendChild(submitButton);

    return form;
}

// Function to handle form submission and save settings to local storage
function handleFormSubmit(event) {
    event.preventDefault();

    const selectedPollenTypes = [];
    const checkboxes = document.querySelectorAll('input[name="pollenType"]:checked');
    checkboxes.forEach(checkbox => {
        selectedPollenTypes.push(checkbox.value);
    });

    localStorage.setItem('selectedPollenTypes', JSON.stringify(selectedPollenTypes));
    alert('Settings saved successfully!');
}

// Function to display pollen settings form when nav_settings button is clicked
function displayPollenSettings() {
    const pollenSettingsForm = createPollenSettingsForm();
    document.body.appendChild(pollenSettingsForm);

    pollenSettingsForm.addEventListener('submit', handleFormSubmit);
}

// Call the getLocation function
getLocation();

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
function buildPollenView(viewData) {
    const myDisplayElement = document.getElementById("PollenData");
    const myCurrentData = viewData[0];
    let myCurrentHTML = `
        <h2>Pollental</h2>
        <ul>
            <div class="line_br"></div>
            <li>el ${myCurrentData.current.alder_pollen} ${myCurrentData.current_units.alder_pollen}</li>
            <div class="line_br"></div>
            <li>birk ${myCurrentData.current.birch_pollen} ${myCurrentData.current_units.birch_pollen}</li>
            <div class="line_br"></div>
            <li>græs ${myCurrentData.current.grass_pollen} ${myCurrentData.current_units.grass_pollen}</li>
            <div class="line_br"></div>
            <li>bynke ${myCurrentData.current.mugwort_pollen} ${myCurrentData.current_units.mugwort_pollen}</li>
            <div class="line_br"></div>
            <li>oliven ${myCurrentData.current.olive_pollen} ${myCurrentData.current_units.olive_pollen}</li>
            <div class="line_br"></divcurrent_units></div>
            <li>ambrosie ${myCurrentData.current.ragweed_pollen} ${myCurrentData.current_units.ragweed_pollen}</li>
        </ul>
    `;
    myDisplayElement.innerHTML = myCurrentHTML;
}

// Event listener for nav_settings button click
// Function to create pollen settings form
function createPollenSettingsForm() {
    const form = document.createElement('form');
    form.id = 'pollenSettingsForm';

    // Add toggle buttons for all pollen types
    const pollenTypes = ['alder_pollen', 'birch_pollen', 'grass_pollen', 'mugwort_pollen', 'olive_pollen', 'ragweed_pollen'];
    pollenTypes.forEach(pollenType => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = pollenType.replace('_', ' ').toUpperCase();
        button.dataset.pollenType = pollenType;
        button.classList.add('toggle-button');
        form.appendChild(button);
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Save Settings';
    form.appendChild(submitButton);

    return form;
}

// Function to handle form submission and save settings to local storage
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Here you can add logic to save the settings to local storage or perform any other action
    alert('Settings saved successfully!');
}

// Function to handle toggle button click event
function handleToggleButton(event) {
    const pollenType = event.target.dataset.pollenType;
    // Here you can add logic to handle the toggle button click for the specific pollen type
    console.log(`Toggle button clicked for ${pollenType}`);
}

// Function to display pollen settings form when nav_settings button is clicked
function displayPollenSettings() {
    const pollenSettingsForm = createPollenSettingsForm();
    document.body.appendChild(pollenSettingsForm);

    pollenSettingsForm.addEventListener('submit', handleFormSubmit);

    // Add event listeners for toggle buttons
    const toggleButtons = document.querySelectorAll('.toggle-button');
    toggleButtons.forEach(button => {
        button.addEventListener('click', handleToggleButton);
    });
}

// Event listener for nav_settings button click
document.getElementById("nav_settings").addEventListener("click", displayPollenSettings);