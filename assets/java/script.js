//Global Variables
var apiKey = "5332ca0f45c08fd52df6c08ea63d1aa2";
var citySearches = [];
var cityArray = [];

//list of querySelectors to be used throughout script 
var cityInputEl = document.querySelector('#city-input');
var cityNameEl = document.querySelector('#city-name');
var searchBtnEl = document.querySelector('#search-btn'); 


// Functions to control form submission
var formSubmitHandler = function(event) {
  //prevents the page from refresing 
  event.preventDefault();

  //get value from input element with error correction 
  var selectedCity = cityInputEl
    .value

console.log(selectedCity);
    if (selectedCity) {
      getCoordinates(selectedCity);
      cityInputEl.value = '';
      //alert for invalid user entry
    }else {
        alert('Please enter a valid city name');
      };
    };

//function calls openweather API to located lat and lon coords   
var getCoordinates = function(city) {
  
  //format the openweather current weather API url
  var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  //make a get request to the url
  fetch(apiUrl)
    .then(function(response) {
      //request was sucessful
      if (response.ok) {
        response.json()
        .then(function(data) {
          var lat = data[0].lat;
          var lon = data[0].lon;
          getCurrentForcast(city, lon, lat);

          if (document.querySelector('.city-list')) {
            document.querySelector('.city-list').remove();
          }
        });

        //Response if invalid location is not entered
      } else{
        alert('Error: Location not found');
      }
    })
    //Response if unable to connect to openweathermaps API
    .catch(function(error) {
      alert('Unable to connect to OpenWeatherMaps')
    })
};

//function calls open weather to get forcast for input city
var getCurrentForcast = function(city, lat, lon) {
  var apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${apiKey}`;
  fetch(apiUrl2)
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);

        cityNameEl.textContent = `${city} (${moment().format("L")})`;

        currentForecast(data);
        //
      });
    }
  })
};

var displayTemp = function(element, temperature) {
  var tempEl = document.querySelector(element);
  var elementText = Math.round(temperature);
  tempEl.textContent = elementText;
};

//Function displays current desired weather conditions for a given city
var currentForecast = function(forecast) {
    
  var forecastEl = document.querySelector('.city-forecast');
  forecastEl.classList.remove('hide');


  displayTemp('#current-temp', forecast.current['temp']); //Why do these temp values seem incorrect???
  displayTemp('#current-feels-like', forecast.current['feels_like']);
  displayTemp('#current-high', forecast.daily[0].temp.max);
  displayTemp('#current-low', forecast.daily[0].temp.min);

  var currentConditionEl = document.querySelector('#current-condition');
  currentConditionEl.textContent = forecast.current.weather[0].description

  var currentHumidityEl = document.querySelector('#current-humidity');
  currentHumidityEl.textContent = forecast.current['humidity'];

  var currentWindEl = document.querySelector('#current-wind-speed')
  currentWindEl.textContent = forecast.current['wind_speed'];

  var uviEl = document.querySelector('#current-uvi')
  var currentUvi = forecast.current['uvi'];
  uviEl.textContent = currentUvi;

  switch (true) {
      case (currentUvi <= 2):
          uviEl.className = 'badge badge-success';
          break;
      case (currentUvi <= 5):
          uviEl.className = 'badge badge-warning';
          break;
      case (currentUvi <=7):
          uviEl.className = 'badge badge-danger';
  }
};


// add event listener to the search form
searchBtnEl.addEventListener('click', formSubmitHandler);

// varDisplaysearch = function() {;}
