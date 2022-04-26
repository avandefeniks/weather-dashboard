var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector(".form-input");
var cityList = document.querySelector("#city-list")

function formHandler(event) {
// disable form default
event.preventDefault();
console.log(cityInputEl.value);


}

searchFormEl.addEventListener("submit", formHandler);;