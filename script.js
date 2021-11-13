let apikey = "c08f8f49cb7a0258a03859cd344d9035";

let cityEl = $("#city");
let dateEl = $("#date");
let currenttempEl = $("#current-temp");
let currentwindEl = $("#current-wind");
let currenthumidityEl = $("#current-humidity");
let currentuvindexEl = $("#current-uv-index");

let day1dateEl = $("#day1-date");
let day1tempEl = $("#day1-temp");
let day1windEl = $("#day1-wind");
let day1humidityEl = $("#day1-humidity");

//get today's date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

$("#searchbutton").on("click", function(event){
    let cityname = $("#citysearch").val(); 
    console.log(cityname); // console log search input

    //get current weather data for city
    function getcurrentweather(cityname) {
        let queryurl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + apikey;
        $.get(queryurl, function(data) {
            console.log(data);

            //display current conditions
            console.log(data.name); //city name
            console.log(today); //today's date
            cityEl.text(data.name + " (" + today +")");






        })
    }
    getcurrentweather(cityname); 
    event.preventDefault();
});