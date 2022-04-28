var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector(".form-input");
var cityListEl = document.querySelector("#city-list");
var currentWeatherDate = document.querySelector("#current-weather-date");
var dayOne = document.querySelector("#day1-date");
var dayTwo = document.querySelector("#day2-date");
var dayThree = document.querySelector("#day3-date");
var dayFour = document.querySelector("#day4-date");
var dayFive = document.querySelector("#day5-date");
var currentCity = document.querySelector(".current-weather-city");

// calculate dates
currentWeatherDate.textContent = " (" + moment().format("MM/DD/YYYY") + ") ";
dayOne.textContent = moment().add(1, 'd').format("MM/DD/YYYY");
dayTwo.textContent = moment().add(2, 'd').format("MM/DD/YYYY");
dayThree.textContent = moment().add(3, 'd').format("MM/DD/YYYY");
dayFour.textContent = moment().add(4, 'd').format("MM/DD/YYYY");
dayFive.textContent = moment().add(5, 'd').format("MM/DD/YYYY");

function formHandler(event) {
    // disable form default
    event.preventDefault();

    // get city from input field
    var city = cityInputEl.value;
    var citiesArr = [];
    console.log(city);

    if (city === null || city === "") {
        alert("Please enter a city")
        return;
    }

    // add cities to list
    var listItemEl = document.createElement("li");
    listItemEl.innerHTML = "<input type='button' class='btn-list' value=" + "'" + city + "'" + ">"
    console.log(listItemEl.innerHTML);
    cityListEl.appendChild(listItemEl);

    // get cities list from local storage
    var getCities = JSON.parse(localStorage.getItem("cities"));

    // check to see if key exists in local storage
    if (getCities === null) {
        getCities = city;

        // add city to array
        citiesArr.push(getCities);
        // add array to local storage
        localStorage.setItem("cities", JSON.stringify(citiesArr));

        // set current city
        currentCity = city;

        // add current city to local storage
        localStorage.setItem("currentCity", currentCity);
    }
    else {

        citiesArr = JSON.parse(localStorage.getItem("cities"));
        // add city to array
        citiesArr.push(city);
        // add array to local storage
        localStorage.setItem("cities", JSON.stringify(citiesArr));

        // set current city
        currentCity = city;

        // add current city to local storage
        localStorage.setItem("currentCity", currentCity);
    }

    // set current city
    currentCity = city;

    // add current city to local storage
    localStorage.setItem("currentCity", currentCity);

    // clear input field
    cityInputEl.value = "";


    loadCities();

    location.reload();



}

function loadCities() {

    var loadArr = [];

    // get array from local storage
    loadArr = JSON.parse(localStorage.getItem("cities"));

    // check for empty key
    if (loadArr === null) {
        return;
    }
    else {
        // loop through array
        for (var i = 0; i < loadArr.length; i++) {
            // add buttons to cities list
            var listCitiesEl = document.createElement("li");
            listCitiesEl.innerHTML = "<input type='button' class='btn-list' value=" + "'" + loadArr[i] + "'" + ">"
            cityListEl.appendChild(listCitiesEl);
        }


    }

    // get current city from local storage
    currentCityGet = localStorage.getItem("currentCity");

    // set current city
    currentCity.textContent = currentCityGet;

}

function citiesButtonHandler(event) {
    var buttonText = event.target.value;

    // call getLongLat function and pass the city
    getLongLat(buttonText);
}

function getLongLat(str1) {

    var apiKey = "927e70b19315871ba3e2c32f90fee57f";

    // check for space in city name
    if (str1.match(/\s/)) {
        var c = str1.split(' ').join('+');
    }
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + c + "&limit=1&appid=" + apiKey;

    console.log(apiUrl);

     // make a get request to url
  fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
        var lat = data[0].lat;
        var lon = data[0].lon;
        console.log(lat, lon);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
    alert("Unable to connect to Open Weather");
  });

}


loadCities();
searchFormEl.addEventListener("submit", formHandler);
cityListEl.addEventListener("click", citiesButtonHandler);