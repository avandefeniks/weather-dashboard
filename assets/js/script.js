var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector(".form-input");
var cityList = document.querySelector("#city-list")

function formHandler(event) {
// disable form default
event.preventDefault();

// get city from input field
var city = cityInputEl.value;
console.log(city);

var listItemEl = document.createElement("li");
listItemEl.innerHTML = "<input type='button' class='btn-list' value=" + city + ">"
console.log(listItemEl.innerHTML);


}

searchFormEl.addEventListener("submit", formHandler);;