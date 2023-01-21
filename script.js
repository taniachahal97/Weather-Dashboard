var apiKey = "2bfb524657a6f7915271758d4f208cf3";

var submitButtonEl = document.getElementById('search-btn-1');
var cityLatitude;
var cityLongitude;


function getCoordinatesApi(searchValue){
    
    var city = searchValue
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
    var iconID;
    var weatherForecast = document.getElementById('5-day-forecast');

    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityLatitude + "&lon=" + cityLongitude + "&appid=" + apiKey;

    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var newdate = data.list[0].dt_txt.split(" ");
        var today = newdate[0]
        console.log(today);
        console.log(data.list[0].main.humidity);
        console.log(data.list[0].main.temp);
        console.log(data.list[0].wind.speed);
        console.log(data.list[0].weather[0].icon);


        for(var i = 1; i < data.list.length; i++){
            var newdate = data.list[i].dt_txt.split(" ");

            //console.log(newdate);
            var newtime = newdate[1];

            if(newtime == '12:00:00')
            {
                //console.log(data.list[i].dt_txt);
                //dayArray.push(data.list[i].dt_txt);
                day = newdate[0];
                temp = data.list[i].main.temp;
                humidity = data.list[i].main.humidity;
                wind = data.list[i].wind.speed;
                iconID = data.list[i].weather[0].icon

                console.log(day);
                console.log(temp);
                console.log(humidity);
                console.log(wind);
                console.log(iconID)

                // card container for 5-day weather forecast body 
                var resultCard = document.createElement('div'); // card // csss for this card  
                
                // body container for forecast content 
                var resultBody = document.createElement('div'); // body of the card // css for body card 

                resultCard.append(resultBody); // appends the body to that card 

                var dateEl = document.createElement('h3'); // creates the elemnets fior the body
                dateEl.textContent = day;

                var icon = 'http://openweathermap.org/img/wn/' + iconID + '.png';
                
                var img = document.createElement("img"); // revert to previous  and then addclass image is -4by3
                img.src = icon;

                var bodyContentEl = document.createElement('p')

                bodyContentEl.innerHTML += '<strong>Temp:</strong>' + temp + '</br>';
                bodyContentEl.innerHTML += '<strong>Wind:</strong>' + wind + '</br>';
                bodyContentEl.innerHTML += '<strong>Humidity:</strong>' + humidity + '</br>';

                

                resultBody.append(dateEl, img, bodyContentEl); // appends the date, temp to the body 
                weatherForecast.append(resultCard); // append the card to the div in the html 

            }

        }


    })
}

submitButtonEl.addEventListener('click',function(){
    //console.log("Test click"); 

    var searchInputVal = document.getElementById('search-location-1').value;
    //console.log(searchInputVal); 
    getCoordinatesApi(searchInputVal) 

})