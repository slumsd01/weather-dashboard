let apikey = "c08f8f49cb7a0258a03859cd344d9035";
$(".col-9").attr("hidden", true);

//get today's date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

$("#searchbutton").on("click", function(event){
    $(".col-9").attr("hidden", false);
    let cityname = $("#citysearch").val(); 
    console.log(cityname); // console log search input

    //get current weather data for city
    function getweather(cityname) {
        let citysearch = "https://api.openweathermap.org/data/2.5/weather?q="+ cityname +"&appid=c08f8f49cb7a0258a03859cd344d9035";
        $.get(citysearch, function(cityinfo) {
            //get lat & lon values
            let lat = cityinfo.coord.lat;
            let lon = cityinfo.coord.lon;

            
            //display city & date
            $("#city").html(cityinfo.name +" ("+ today +") <img id='weather-icon'>");
            
            
            //display current weather
            let onecallapi = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&exclude=minutely,hourly&appid=c08f8f49cb7a0258a03859cd344d9035&units=imperial";
            $.get(onecallapi, function(response){
                console.log(response);
                $("#current-temp").text("Temp: "+ Math.round(response.current.temp) +"\xB0F");
                $("#current-wind").text("Wind: "+ response.current.wind_speed +"MPH"); //wind
                $("#current-humidity").text("Humidity: "+ response.current.humidity +"%") //humidity

                //uv index
                $("#current-uv-index").text(response.current.uvi);

                if (response.current.uvi < 3) {
                    $("#current-uv-index").addClass("low-uv");
                }
                else if (response.current.uvi > 2 && response.current.uvi < 6) {
                    $("#current-uv-index").addClass("moderate-uv");
                }
                else if (response.current.uvi > 5 && response.current.uvi < 8) {
                    $("#current-uv-index").addClass("high-uv");
                }
                else if (response.current.uvi > 7 && response.current.uvi < 11) {
                    $("#current-uv-index").addClass("very-high-uv");
                }
                else if (response.current.uvi > 10) {
                    $("#current-uv-index").addClass("extreme-uv");
                }

                let iconcode = response.current.weather[0].icon;
                var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                $('#weather-icon').attr('src', iconurl);
            })
        })
    }
    getweather(cityname); 
    event.preventDefault();
});