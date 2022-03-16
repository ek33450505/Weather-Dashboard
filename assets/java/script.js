var cityInputEl = document.querySelector('#city-input');
var cityNameEl = document.querySelector('#city-name');
var searchBtn = document.querySelector('#search-btn'); 

//Global Variables
var apiKey = "eed8624c4362c154ef976f4cb7d4b145";
var citySearches = [];
var today = moment().format("L");

// Functions to control form submission

