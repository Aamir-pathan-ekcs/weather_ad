$(document).ready(function () {

    // IPRegistry API to get geolocation data
    var ipRegistryUrl = 'https://api.ipregistry.co/?key=mbwyly5nacbley45';

    $.getJSON(ipRegistryUrl, function (ipData) {
        // var lat = ipData.location.latitude;
        // var long = ipData.location.longitude;
        // var cityName = ipData.location.city;

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
                var weatherApiKey = '740f4f2d840f4e568f4f2d840fce5629';
                var weatherUrl = `https://api.weather.com/v3/wx/observations/current?geocode=${lat},${long}&units=e&language=en-US&format=json&apiKey=${weatherApiKey}`;
                console.log(weatherUrl);
                const response1 = await fetch(weatherUrl);
                const weatherData = await response1.json();
                let temperature = weatherData.temperature;
                let weatherDescription = weatherData.wxPhraseLong;
                if (!response1.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // let url = `https://api.weather.com/v3/wx/observations/current?geocode=${lat},${long}&units=e&language=en-US&format=json&apiKey=740f4f2d840f4e568f4f2d840fce5629`;
                document.querySelector("#result").innerText = `${temperature} °F - ${weatherDescription}`;
                document.querySelector("#city").innerText = city;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        window.onload = fetchIPAddress;
        //  async function getWeather() {
        //     try {
        //         const response = await fetch(weatherUrl);
        //         const weatherData = await response.json();

        //         // Extract relevant weather data
        //         let temperature = weatherData.temperature;
        //         let weatherDescription = weatherData.wxPhraseLong;

        //         // Display data in the banner
        //         document.querySelector("#result").innerText = `${temperature} °F - ${weatherDescription}`;
        //         document.querySelector("#city").innerText = cityName;

        //     } catch (error) {
        //         console.error('Error fetching weather data:', error);
        //     }
        // }

        // Display current time
        var dtime = new Date();
        var minutes = dtime.getMinutes();
        var formattedMinutes = (minutes < 10) ? "0" + minutes : minutes;
        var hours = dtime.getHours();
        var formattedHours = (hours % 12 || 12); //Convert to 12-hour format
        var ampm = hours >= 12 ? 'PM' : 'AM';
        $('#currentTime').text(" at " + formattedHours + ":" + formattedMinutes + " " + ampm);

        // Call the function to get weather data
        // getWeather();
    });
});