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

  //get value from input element 
  var selectedCity = cityInputEl
    .value

// console.log(selectedCity);
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

  //make a get request to the url to pull lat and lon
  fetch(apiUrl)
    .then(function(response) {
      //request was sucessful
      if (response.ok) {
        response.json()
        .then(function(data) {
          var lat = data[0].lat;
          var lon = data[0].lon;
          getCurrentForcast(city, lat, lon);

          if (document.querySelector('.city-list')) {
            document.querySelector('.city-list').remove();
          }

          cityHistory(city);
          loadPastCities();
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
        fiveDayForecast(data);
      });
    }
  })
};
//function for temperature data
var displayTemp = function(element, temperature) {
  var tempEl = document.querySelector(element);
  var elementText = Math.round(temperature);
  tempEl.textContent = elementText;
};

//Function displays current desired weather conditions for a given city
var currentForecast = function(forecast) {
    
  var forecastEl = document.querySelector('.city-forecast');
  forecastEl.classList.remove('hide');

  var weatherIconEl = document.querySelector('#today-icon');
  var currentIcon = forecast.current.weather[0].icon;
  weatherIconEl.setAttribute('src', `http://openweathermap.org/img/wn/${currentIcon}.png`);
  weatherIconEl.setAttribute('alt', forecast.current.weather[0].main)

  displayTemp('#current-temp', forecast.current['temp']); 
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

//Function to provide user with 5 day forcast

var fiveDayForecast = function(forecast) { 
    
  for (var i = 1; i < 6; i++) {
      var dateP = document.querySelector('#date-' + i);
      dateP.textContent = moment().add(i, 'days').format('M/D/YYYY');

      var iconImg = document.querySelector('#icon-' + i);
      var iconCode = forecast.daily[i].weather[0].icon;
      iconImg.setAttribute('src', `http://openweathermap.org/img/wn/${iconCode}.png`);
      iconImg.setAttribute('alt', forecast.daily[i].weather[0].main);

      displayTemp('#temp-' + i, forecast.daily[i].temp.day);
      displayTemp('#high-' + i, forecast.daily[i].temp.max);
      displayTemp('#low-' + i, forecast.daily[i].temp.min);

      var humiditySpan = document.querySelector('#humidity-' + i);
      humiditySpan.textContent = forecast.daily[i].humidity;
  }
};

//add function to display past searched cities
var cityHistory = function(city) {

  for (var i = 0; i < cityArray.length; i++) {
      if (city === cityArray[i]) {
          cityArray.splice(i, 1);
      }
  }

  cityArray.push(city);
  localStorage.setItem('cities', JSON.stringify(cityArray));
};

//Function to load cities from local storage
var loadPastCities = function() {
  cityArray = JSON.parse(localStorage.getItem('cities'));

  if (!cityArray) {
      cityArray = [];
      return false;
  } else if (cityArray.length > 5) {
      cityArray.shift();
  }

  var recentCities = document.querySelector('#recent-cities');
  var cityListUl = document.createElement('ul');
  cityListUl.className = 'list-group list-group-flush city-list';
  recentCities.appendChild(cityListUl);

  for (var i = 0; i < cityArray.length; i++) {
      var cityListItem = document.createElement('button');
      cityListItem.setAttribute('type', 'button');
      cityListItem.className = 'list-group-item';
      cityListItem.setAttribute('value', cityArray[i]);
      cityListItem.textContent = cityArray[i];
      cityListUl.prepend(cityListItem);
  }

  var cityList = document.querySelector('.city-list');
  cityList.addEventListener('click', selectRecentCities)
};

var selectRecentCities = function(event) {
  var clickedCity = event.target.getAttribute('value');

  getCoordinates(clickedCity);

};


// add event listener to the search form
searchBtnEl.addEventListener('click', formSubmitHandler);

cityInputEl.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
      cityBtn.click();
  }
});
