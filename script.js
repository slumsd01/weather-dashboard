let apikey = "c08f8f49cb7a0258a03859cd344d9035";
$(".col-9").attr("hidden", true);

$("#searchbutton").on("click", function(event){
    $(".col-9").attr("hidden", false);
    let cityname = $("#citysearch").val(); 
    console.log(cityname); // console log search input

    //get weather data for city
    function getweather(cityname) {
        let citysearch = "https://api.openweathermap.org/data/2.5/weather?q="+ cityname +"&appid=c08f8f49cb7a0258a03859cd344d9035";
        $.get(citysearch, function(cityinfo) {
            //get lat & lon values
            let lat = cityinfo.coord.lat;
            let lon = cityinfo.coord.lon;

            //get date's date
            let currentdate = new Date(cityinfo.dt * 1000);
            let day = currentdate.getDate();
            let month = currentdate.getMonth() + 1;
            let year = currentdate.getFullYear();
            
            //display city, date, & icon
            $("#city").html(cityinfo.name +" ("+ month + "/" + day + "/" + year +") <img id='weather-icon'>");
            
            //call for current weather current weather
            let onecallapi = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&exclude=minutely,hourly&appid=c08f8f49cb7a0258a03859cd344d9035&units=imperial";
            $.get(onecallapi, function(response){
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

                //weather icon
                let iconcode = response.current.weather[0].icon;
                let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                $('#weather-icon').attr('src', iconurl);

                //display 5-day forecast
                for (let i = 1; i < 6; i++) {
                    const element = response.daily[i];
                    
                    //date
                    let forecastdate = new Date(response.daily[i].dt * 1000);
                    let forecastday = forecastdate.getDate();
                    let forecastmonth = forecastdate.getMonth() + 1;
                    let forecastyear = forecastdate.getFullYear();
                    
                    //icon
                    let forecasticoncode = element.weather[0].icon;
                    let forecasticonurl = "http://openweathermap.org/img/w/" + forecasticoncode + ".png";

                    //temp
                    let forecasttemp = element.temp.day;

                    //wind
                    let forecastwind = element.wind_speed;

                    //humidity
                    let forecasthumidity = element.humidity;

                    //add to page
                    $("#forecast").append(
                        "<div class='col forecastcards'<p>"+ forecastmonth +"/"+ forecastday +"/"+ forecastyear +"</p><img src='"+ forecasticonurl +"'><p>Temp: "+ Math.round(forecasttemp) + "&#176;</p><p>Wind: "+ forecastwind +"MPH</p><p>Humidity: "+ forecasthumidity +"%</p></div>"
                    )
                }
            })
        })
    }
    getweather(cityname); 
    event.preventDefault();
});