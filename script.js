var apiKey = "2bfb524657a6f7915271758d4f208cf3";
var city = "london"
var cityLatitude;
var cityLongitude;


function getCoordinatesApi(){
    
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&" + "appid=" + apiKey;

    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //console.log(data);

        cityLatitude = data[0].lat;
        cityLongitude = data[0].lon;

        getForecastApi();

    })

}

function getForecastApi(){
    var day;
    var humidity;
    var temp;
    var wind;
    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLatitude + "&lon=" + cityLongitude + "&appid=" + apiKey;

    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        console.log(data.list[0].dt_txt);
        console.log(data.list[0].main.humidity);
        console.log(data.list[0].main.temp);
        console.log(data.list[0].wind.speed);


        for(var i = 1; i < data.list.length; i++){
            var newdate = data.list[i].dt_txt.split(" ");

            //console.log(newdate);
            var newtime = newdate[1];

            if(newtime == '00:00:00'){
                //console.log(data.list[i].dt_txt);
                //dayArray.push(data.list[i].dt_txt);
                day = data.list[i].dt_txt;
                temp = data.list[i].main.temp;
                humidity = data.list[i].main.humidity;
                wind = data.list[i].wind.speed;

                console.log(day);
                console.log(temp);
                console.log(humidity);
                console.log(wind);

            }

        }


    })
}

getCoordinatesApi();

