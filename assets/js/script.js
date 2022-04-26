var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector(".form-input");
var cityListEl = document.querySelector("#city-list");
var cityButtonsEl = document.querySelectorAll(".btn-list");

function formHandler(event) {
    // disable form default
    event.preventDefault();

    // get city from input field
    var city = cityInputEl.value;
    console.log(city);

    // add cities to list
    var listItemEl = document.createElement("li");
    listItemEl.innerHTML = "<input type='button' class='btn-list' value=" + "'" + city + "'" + ">"
    console.log(listItemEl.innerHTML);
    cityListEl.appendChild(listItemEl);

    cityInputEl.value = "";

    // saveCityList(city);

}

function saveCityList() {
    // console.log(string1 + " is a nice city")
    console.log(cityButtonsEl)

    var citiesArr = [];

    // loop through cities list
    // for (var i = 0; i < cityButtonsEl.length; i++) {
    //     // add cities to array
    //     citiesArr.push(cityButtonsEl);
    //     console.log(citiesArr);
    // }

    // add array to local storage
    // localStorage.setItem("cities", JSON.stringify(citiesArr));

}
saveCityList();
searchFormEl.addEventListener("submit", formHandler);;