
var apiKey = "5332ca0f45c08fd52df6c08ea63d1aa2";

var getGeocode = function(search) {
    //format the openweather geocoding api
    var cityName = 'columbus';
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    //make a request to the Url
    fetch(apiUrl)
        .then(function(response) {
            //request was sucessful
            if (response.ok) {
                // console.log (response);
                response.json().then(function(search) {
                    var lat = search[0].lat;
                    var lon = search[0].lon;
                    getWeather(lat, lon);
                });
            } else {
                alert('Error: Location not found')
            }
        })
        .catch(function(error) {
            alert("unable to connect to openweather");
        });
};

var getWeather = function(lat, lon) {

    var apiUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}` 
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(weatherData) {
                    console.log(weatherData);
                })
            }
        })
}

getGeocode();

getWeather();

varDisplaysearch = function() {;}