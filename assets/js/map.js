         var map = null; // Store map object

        // Function to show map centered at current location
        function showMapWithCurrentLocation() {
            if (map === null) {
                map = L.map('app'); // Create map

                // Add a tile layer
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                // Get current location
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;

                    // Center map at current location
                    map.setView([latitude, longitude], 13);

                    // Add marker at current location
                    L.marker([latitude, longitude]).addTo(map)
                        .bindPopup('Your Location').openPopup();
                }, function(error) {
                    console.error('Error getting current position:', error);
                });

                // Make the map container take up the whole page
                document.getElementById('app').style.height = '70vh';
            } else {
                // If map is already created, remove it and set map to null
                map.remove();
                map = null;

                // Reset the map container height
                document.getElementById('app').style.height = ''; // Reset to default
            }
        }

        // Add event listener to map button
        document.getElementById("nav_map").addEventListener("click", function() {
            showMapWithCurrentLocation();
        });