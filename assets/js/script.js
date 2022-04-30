var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector(".form-input");
var cityListEl = document.querySelector("#city-list");
var currentWeatherDate = document.querySelector("#current-weather-date");
var dayTwo = document.querySelector("#day2-date");
var dayThree = document.querySelector("#day3-date");
var dayFour = document.querySelector("#day4-date");
var dayFive = document.querySelector("#day5-date");
var daySix = document.querySelector("#day6-date");
var currentCity = document.querySelector(".current-weather-city");

// calculate dates
dayTwo.textContent = moment().add(1, 'd').format("MM/DD/YYYY");
dayThree.textContent = moment().add(2, 'd').format("MM/DD/YYYY");
dayFour.textContent = moment().add(3, 'd').format("MM/DD/YYYY");
dayFive.textContent = moment().add(4, 'd').format("MM/DD/YYYY");
daySix.textContent = moment().add(5, 'd').format("MM/DD/YYYY");

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
    // console.log(listItemEl.innerHTML);
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
    // localStorage.setItem("currentCity", currentCity);

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

        // get current city from local storage
        currentWeatherDate.textContent = localStorage.getItem("currentCity") + " (" + moment().format("MM/DD/YYYY") + ") ";
    }
}


function citiesButtonHandler(event) {
    // event.preventDefault();
    var buttonText = event.target.value;

    // add buttonText to local storage as currentCity
    localStorage.setItem("currentCity", buttonText);

    loadCities();

    // call getLongLat function and pass the city
    getLongLat(buttonText);



}

function getLongLat(str1) {

    var apiKey = "927e70b19315871ba3e2c32f90fee57f";

    // check for space in city name
    if (str1.match(/\s/)) {
        var c = str1.split(' ').join('+');
        var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + c + "&limit=1&appid=" + apiKey;
    }
    else {
        var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + str1 + "&limit=1&appid=" + apiKey;
    }

    console.log(apiUrl);

    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    // console.log(data);
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    // console.log(lat, lon);
                    getWeather(lat, lon);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("getLongLat");
        });

    // pause time to wait for promise
    // waitTime(6000); // 2 seconds


}

function getWeather(lat1, lon1) {

    var apiKey = "927e70b19315871ba3e2c32f90fee57f";
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat1 + "&lon=" + lon1 +
        "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
    // console.log(apiUrl);
    var currentIconEl = document.querySelector("#current-weather-icon");
    var currentTempEl = document.querySelector("#current-temp");
    var currentWindEl = document.querySelector("#current-wind");
    var currentHumidityEl = document.querySelector("#current-humidity");
    var currentUvEl = document.querySelector("#current-uv");
    var dayTwoIconEl = document.querySelector("#day2-icon"); ("#day2-temp");
    var dayTwoTempEl = document.querySelector("#day2-temp");
    var dayTwoWindEl = document.querySelector("#day2-wind");
    var dayTwoHumidityEl = document.querySelector("#day2-humidity");

    var dayThreeIconEl = document.querySelector("#day3-icon");
    var dayThreeTempEl = document.querySelector("#day3-temp");
    var dayThreeWindEl = document.querySelector("#day3-wind");
    var dayThreeHumidityEl = document.querySelector("#day3-humidity");

    var dayFourIconEl = document.querySelector("#day4-icon");
    var dayFourTempEl = document.querySelector("#day4-temp");
    var dayFourWindEl = document.querySelector("#day4-wind");
    var dayFourHumidityEl = document.querySelector("#day4-humidity");

    var dayFiveIconEl = document.querySelector("#day5-icon");
    var dayFiveTempEl = document.querySelector("#day5-temp");
    var dayFiveWindEl = document.querySelector("#day5-wind");
    var dayFiveHumidityEl = document.querySelector("#day5-humidity");

    var daySixIconEl = document.querySelector("#day6-icon");
    var daySixTempEl = document.querySelector("#day6-temp");
    var daySixWindEl = document.querySelector("#day6-wind");
    var daySixHumidityEl = document.querySelector("#day6-humidity");


    // clear out current weather icon
    currentIconEl.textContent = "";

    // make a get request to url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                // console.log(response);
                response.json().then(function (data) {

                    // current weather information
                    // current icon
                    var iconImage = document.createElement("img");
                    iconImage.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
                    iconImage.setAttribute("width", "75px");
                    iconImage.setAttribute("height", "75px");
                    currentIconEl.appendChild(iconImage);

                    currentTempEl.textContent = data.current.temp;
                    currentWindEl.textContent = data.current.wind_speed + " MPH";
                    currentHumidityEl.textContent = Math.round(data.current.humidity) + "%";

                    // UV index with color backgrounds green - minimal, yellow - moderate and red - high
                    // currentUvEl.style.color = "white";
                    currentUvEl.style.padding = "1px 15px 1px 15px";
                    currentUvEl.textContent = data.current.uvi;
                    if (data.current.uvi <= 2) {
                        currentUvEl.style.backgroundColor = "green";
                        currentUvEl.style.color = "white";

                    }
                    else if (data.current.uvi > 2 && data.current.uvi < 7.99) {
                        currentUvEl.style.backgroundColor = "yellow";
                        currentUvEl.style.color = "black";
                    }
                    else {
                        currentUvEl.style.backgroundColor = "red";
                        currentUvEl.style.color = "white";
                    }
                    // day two weather
                    // day two icon
                    var iconTwoImage = document.createElement("img");
                    iconTwoImage.src = "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + "@2x.png";
                    iconTwoImage.setAttribute("width", "50px");
                    iconTwoImage.setAttribute("height", "50px");
                    dayTwoIconEl.appendChild(iconTwoImage);

                    dayTwoTempEl.textContent = data.daily[0].temp.max;
                    dayTwoWindEl.textContent = data.daily[0].wind_speed;
                    dayTwoHumidityEl.textContent = data.daily[0].humidity;

                    // day three weather
                    // day three icon
                    var iconThreeImage = document.createElement("img");
                    iconThreeImage.src = "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png";
                    iconThreeImage.setAttribute("width", "50px");
                    iconThreeImage.setAttribute("height", "50px");
                    dayThreeIconEl.appendChild(iconThreeImage);

                    dayThreeTempEl.textContent = data.daily[1].temp.max;
                    dayThreeWindEl.textContent = data.daily[1].wind_speed;
                    dayThreeHumidityEl.textContent = data.daily[1].humidity;

                    // day four weather
                    // day four icon
                    var iconFourImage = document.createElement("img");
                    iconFourImage.src = "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png";
                    iconFourImage.setAttribute("width", "50px");
                    iconFourImage.setAttribute("height", "50px");
                    dayFourIconEl.appendChild(iconFourImage);

                    dayFourTempEl.textContent = data.daily[2].temp.max;
                    dayFourWindEl.textContent = data.daily[2].wind_speed;
                    dayFourHumidityEl.textContent = data.daily[2].humidity;

                    // day five weather
                    // day five icon
                    var iconFiveImage = document.createElement("img");
                    iconFiveImage.src = "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png";
                    iconFiveImage.setAttribute("width", "50px");
                    iconFiveImage.setAttribute("height", "50px");
                    dayFiveIconEl.appendChild(iconFiveImage);

                    dayFiveTempEl.textContent = data.daily[3].temp.max;
                    dayFiveWindEl.textContent = data.daily[3].wind_speed;
                    dayFiveHumidityEl.textContent = data.daily[3].humidity;

                    // daysix weather
                    // day six icon
                    var iconSixImage = document.createElement("img");
                    iconSixImage.src = "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png";
                    iconSixImage.setAttribute("width", "50px");
                    iconSixImage.setAttribute("height", "50px");
                    daySixIconEl.appendChild(iconSixImage);

                    daySixTempEl.textContent = data.daily[4].temp.max;
                    daySixWindEl.textContent = data.daily[4].wind_speed;
                    daySixHumidityEl.textContent = data.daily[4].humidity;

                    // location.reload();


                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Get Weather");
        });

}

// solution found at stack overflow
function waitTime(ms) {
    var start = new Date().getTime();
    var end = start
    while (end < start + ms) {
        end = new Date().getTime();
    }
}


loadCities();

document.addEventListener("DOMContentLoaded", function() {
    currentCity.textContent = ""
    currentCity.style.display = "none";

  });  
searchFormEl.addEventListener("submit", formHandler);
cityListEl.addEventListener("click", citiesButtonHandler);