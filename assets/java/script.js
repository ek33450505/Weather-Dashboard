var cityInputEl = document.querySelector('#city-input');
var cityNameEl = document.querySelector('#city-name');
var searchBtnEl = document.querySelector('#search-btn'); 

//Global Variables
var apiKey = "5332ca0f45c08fd52df6c08ea63d1aa2";
var citySearches = [];
var cityArray = [];
// var cityInput = 'Columbus';

// Functions to control form submission

var formSubmitHandler = function(event) {
  //prevents the page from refresing 
  event.preventDefault();

  //get value from input element with error correction 
  var selectedCity = cityInputEl
    .value
    .trim()
    .toLowercase()
    .split(' ')
    .join(' ');

    if (selectedCity) {
      getCoordinates(selectedCity);
      cityInputEl.value = 'Columbus';
      //alert for invalid user entry
    }else {
        alert('Please enter a valid city name');
      };
    };

//function calls openweather API to located lat and lon coords   
var getCoordinates = function(city) {
  
  //format the openweather current weather API url
  var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&units=imperial&appid=${apiKey}`;

  //make a get request to the url
  fetch(apiUrl)
    .then(function(response) {
      //request was sucessful
      if (response.ok) {
        response.json()
        .then(function(data) {
          var lat = search[0].lat;
          var lon = search[0].lon;
          getCityForcast(city, lon, lat);

          if (document.querySelector('.city-list')) {
            document.querySelector('.city-list').remove();
          }

          //
          //
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
      response.json.then(function(data) {

        cityNameEl.textContent = `${city} (${moment().format("L")})`;

        console.log(data)
        //
        //
      });
    }
  })
};

//add event listener to the search form
// searchBtnEl.addEventListener('submit', search-btn);

getCoordinates();
getCurrentForcast();
varDisplaysearch = function() {;}
