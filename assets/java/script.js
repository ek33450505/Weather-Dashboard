var cityInputEl = document.querySelector('#cityForm');
var cityListEl = document.querySelector('#cityList');
var searchBtn = document.querySelector('#button-addon'); 

var cityContainerEl = document.querySelector("#cityName");
var todayContainerEl = document.querySelector("#todayOutput");
var previousSearch = document.querySelector("#cityHistory");
var cards = document.querySelector("#card-deck")

//Global Variables
var apiKey = "5332ca0f45c08fd52df6c08ea63d1aa2";
var citySearches = [];
var today = moment().format("L");

// Functions to control form submission
var submitForm = function (event) {
    //prevents page from refreshing
    event.preventDefault();
    // get value from input element
    var citySearch = cityInputEl.value.trim();
    if (citySearch) {
        getWeather(citySearch);
        // clear old content
        cityInputEl.value = '';
    } else {
        alert('Please enter a City');
    }
    citySearches.push(citySearch);
    storeCity(citySearches);
    renderCities();
};
//Function to store previous searches in local storage
var storeCity = function() {
    localStorage.setItem("searchCity", JSON.stringify(citySearches));
    return;
};

var getWeather = function(location) {
    //format the openweather geocoding api
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=${apiKey}';

    //make a request to the Url
    fetch(apiUrl)
        .then(function(response) {
            //request was sucessful
            if (response.ok) {
                // console.log (response);
                response.json().then(function(currentData) {
                  displayWeather(currentData, location);
                  getForcast(currentData, location);
                });
            } else {
                alert('Error: Location not found')
            }
        })
        .catch(function(error) {
            alert("unable to connect to openweather");
        });
};

