let apikey = "c08f8f49cb7a0258a03859cd344d9035";
$(".col-9").attr("hidden",true);

function getweather(cityname) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid=c08f8f49cb7a0258a03859cd344d9035";
    $.get(queryURL, function(cityinfo) {
    
        let lat = cityinfo.coord.lat;
        let lon = cityinfo.coord.lon;
        console.log(lat, lon);

        let currentdate = new Date(cityinfo.dt * 1000);
        let month = currentdate.getMonth() + 1;
        let day = currentdate.getDate();
        let year = currentdate.getFullYear();
        
        $("#city-header").html(cityinfo.name +" ("+ month + "/" + day + "/" + year +") <img id='weather-icon'>");

        let onecallapi = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid=c08f8f49cb7a0258a03859cd344d9035&units=imperial";
        $.get(onecallapi, function(data){
            $("#current-temp").text("Temp: "+ Math.round(data.current.temp) +"\xB0F");
            $("#current-wind").text("Wind: "+ data.current.wind_speed +"MPH"); 
            $("#current-humidity").text("Humidity: "+ data.current.humidity +"%")
    
            $("#current-uv-index").text(data.current.uvi);
    
            if (data.current.uvi < 3) {
                $("#current-uv-index").addClass("low-uv");
            }
            else if (data.current.uvi > 2 && data.current.uvi < 6) {
                $("#current-uv-index").addClass("moderate-uv");
            }
            else if (data.current.uvi > 5 && data.current.uvi < 8) {
                $("#current-uv-index").addClass("high-uv");
            }
            else if (data.current.uvi > 7 && data.current.uvi < 11) {
                $("#current-uv-index").addClass("very-high-uv");
            }
            else if (data.current.uvi > 10) {
                $("#current-uv-index").addClass("extreme-uv");
            }
    
            let iconcode = data.current.weather[0].icon;
            let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            $('#weather-icon').attr('src', iconurl);

            $(".col-9").attr("hidden",false);
            $("#forecast").empty();

    
            for (let i = 1; i < 6; i++) {
                const element = data.daily[i];
                
                let forecastdate = new Date(data.daily[i].dt * 1000);
                let forecastday = forecastdate.getDate();
                let forecastmonth = forecastdate.getMonth() + 1;
                let forecastyear = forecastdate.getFullYear();

                let forecasttemp = element.temp.day;
                let forecastwind = element.wind_speed;
                let forecasthumidity = element.humidity;

                
                let forecasticoncode = element.weather[0].icon;
                let forecasticonurl = "http://openweathermap.org/img/w/" + forecasticoncode + ".png";


                $("#forecast").append(
                    "<div class='col forecast-cards'<p>"+ forecastmonth +"/"+ forecastday +"/"+ forecastyear +"</p><img src='"+ forecasticonurl +"'><p>Temp: "+ Math.round(forecasttemp) + "&#176;</p><p>Wind: "+ forecastwind +"MPH</p><p>Humidity: "+ forecasthumidity +"%</p></div>"
                )
            }
            
        })
    })
}

$("#searchbutton").on("click", function(event){
    let cityname = $("#citysearch").val();
    event.preventDefault();
    getweather(cityname);
    
    $("#search-history").append("<button class='btn btn-secondary' type='button' id='recent-city'>" + cityname + "</button>");
    $("#search-history").children().on("click", function() {
        cityname = $(this).html();
        console.log(cityname);
        getweather(cityname);
    })
})