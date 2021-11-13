let apikey = "c08f8f49cb7a0258a03859cd344d9035";

$("#searchbutton").on("click", function(event){
    let cityname = $("#citysearch").val(); 
    console.log(cityname); // console log search input


    function getweather(cityname) {
        let queryurl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + apikey;
        $.get(queryurl, function(data) {
            console.log(data);
        })
    }

    getweather(cityname); // get weather data for city





    

    //display current conditions

    //display forcast

    //display recent searches







    event.preventDefault();
});