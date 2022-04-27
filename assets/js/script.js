var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector(".form-input");
var cityListEl = document.querySelector("#city-list");

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
    }
    else {

        citiesArr = JSON.parse(localStorage.getItem("cities"));
        // add city to array
        citiesArr.push(city);
        // add array to local storage
        localStorage.setItem("cities", JSON.stringify(citiesArr));
    }

    // clear input field
    cityInputEl.value = "";


    loadCities();

    location.reload();

}

function saveCityList() {
    // console.log(string1 + " is a nice city")

    // get city list
    // var cityButtonsEl = document.querySelectorAll(".btn-list");
    // var cityButtonsEl = document.querySelectorAll("input[value]");
    // citiesList = cityButtonsEl.value;
    // console.log(cityButtonsEl)

    // var citiesArr = [];

    // loop through cities list
    // for (var i = 0; i < cityButtonsEl.length; i++) {
    //     // add cities to array
    //     citiesArr.push(citiesList);
    //     console.log(citiesArr);
    // }

    // add array to local storage
    // localStorage.setItem("cities", JSON.stringify(citiesArr));

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
}

function citiesButtonHandler(event) {
    console.log(event.target.value);
    var buttonText = event.target.value;

    // pass buttonText to formHandler
    // formHandler(buttonText);
}

loadCities();
searchFormEl.addEventListener("submit", formHandler);
cityListEl.addEventListener("click", citiesButtonHandler);