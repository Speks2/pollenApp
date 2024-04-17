 function showMap() {
            // Create a map centered at the user's location
            var map = L.map('map').setView([0, 0], 13);

            // Add a tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Check if geolocation is supported
            if ("geolocation" in navigator) {
                // Get the current location
                navigator.geolocation.getCurrentPosition(function(position) {
                    // Add a marker for the user's location
                    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
                        .bindPopup('Your Location').openPopup();
                });
            } else {
                console.log("Geolocation is not supported.");
            }
        }