$(document).ready(function () {
    // IPRegistry API to get geolocation data
    var ipRegistryUrl = 'https://api.ipregistry.co/?key=mbwyly5nacbley45';

    $.getJSON(ipRegistryUrl, function (ipData) {
        async function fetchIPAddress() {
            try {
                const response = await fetch('/'); // Fetch data from the server
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                let lat = data.location.latitude;
                let long = data.location.longitude;
                let city = data.city.names.en;

                // Weather API URL
                var weatherApiKey = '740f4f2d840f4e568f4f2d840fce5629';
                var weatherUrl = `https://api.weather.com/v3/wx/observations/current?geocode=${lat},${long}&units=e&language=en-US&format=json&apiKey=${weatherApiKey}`;
                console.log(weatherUrl);

                // Fetch weather data
                const weatherResponse = await fetch(weatherUrl);
                if (!weatherResponse.ok) {
                    throw new Error(`HTTP error! Status: ${weatherResponse.status}`);
                }

                const weatherData = await weatherResponse.json();
                let temperature = weatherData.temperature;
                let weatherDescription = weatherData.wxPhraseLong;

                // Display the weather and city information
                document.querySelector("#result").innerText = `${temperature} °F - ${weatherDescription}`;
                document.querySelector("#city").innerText = city;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Immediately invoke the fetchIPAddress function
        fetchIPAddress();

        // Display current time
        var dtime = new Date();
        var minutes = dtime.getMinutes();
        var formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
        var hours = dtime.getHours();
        var formattedHours = (hours % 12 || 12); // Convert to 12-hour format
        var ampm = hours >= 12 ? 'PM' : 'AM';
        $('#currentTime').text(" at " + formattedHours + ":" + formattedMinutes + " " + ampm);
    });
});
