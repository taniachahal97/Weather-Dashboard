var apiKey = "2bfb524657a6f7915271758d4f208cf3";

var submitButtonEl = document.getElementById('search-btn-1');
var cityLatitude;
var cityLongitude;
var cityListEl = $('#city-search-list');

function getCoordinatesApi(searchValue){
    
    var city = searchValue
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&" + "appid=" + apiKey;

    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //console.log(data);

        var cityItem = localStorage.getItem('cityName'); // get city name from local storage
        var cityListItemEl = $('<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">'); // creates li tag

        cityListItemEl.text(cityItem); //writes local storage text to li tag
        cityListEl.append(cityListItemEl); // appends li tag to ul tag

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
    var todayForecast = document.getElementById('today-forecast');

    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLatitude + "&lon=" + cityLongitude + "&appid=" + apiKey;

    fetch(requestUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var newdate = data.list[0].dt_txt.split(" ");
        var today = newdate[0]
        //console.log(today);
        //console.log(data.list[0].main.humidity);
        //console.log(data.list[0].main.temp);
        //console.log(data.list[0].wind.speed);
        //console.log(data.list[0].weather[0].icon);

        var todayDate = today;
        var todayTemp = data.list[0].main.temp;
        var todayHumidity = data.list[0].main.humidity;
        var todayWind = data.list[0].wind.speed;
        var todayIcon = data.list[0].weather[0].icon;

        var cityName = localStorage.getItem('cityName');

        // card container for 5-day weather forecast body 
        var resultCard1 = document.createElement('div'); // card // csss for this card  
        resultCard1.classList.add('card1');
                
        // body container for forecast content 
        var resultBody1 = document.createElement('div'); // body of the card // css for body card 
        resultBody1.classList.add('card-body');

        resultCard1.append(resultBody1); // appends the body to that card 

        var todayDateEl = document.createElement('h3'); // creates the elemnets fior the body
        todayDateEl.textContent = cityName + " (" + todayDate + " )";

        var todayIcon = 'https://openweathermap.org/img/wn/' + todayIcon + '.png';
        
        var todayImg = document.createElement("img"); // revert to previous  and then addclass image is -4by3
        todayImg.src = todayIcon;

        var bodyContentEl1 = document.createElement('p')

        bodyContentEl1.innerHTML += '<strong>Temp:</strong>' + todayTemp + " \u212A " + '</br>';
        bodyContentEl1.innerHTML += '<strong>Wind:</strong>' + todayWind + '</br>';
        bodyContentEl1.innerHTML += '<strong>Humidity:</strong>' + todayHumidity + " \u0025 " + '</br>';

        resultBody1.append(todayDateEl, todayImg, bodyContentEl1); // appends the date, temp to the body 
        todayForecast.append(resultCard1); // append the card to the div in the html 

        for(var i = 1; i < data.list.length; i++){
            var newdate = data.list[i].dt_txt.split(" ");

            //console.log(newdate);
            var newtime = newdate[1];

            if(newtime == '00:00:00')
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
                resultCard.classList.add('column','card');
                
                // body container for forecast content 
                var resultBody = document.createElement('div'); // body of the card // css for body card 
                resultBody.classList.add('card-body');

                resultCard.append(resultBody); // appends the body to that card 

                var dateEl = document.createElement('h3'); // creates the elemnets fior the body
                dateEl.textContent = day;

                var icon = 'http://openweathermap.org/img/wn/' + iconID + '.png';
                
                var img = document.createElement("img"); // revert to previous  and then addclass image is -4by3
                img.src = icon;

                var bodyContentEl = document.createElement('p')

                bodyContentEl.innerHTML += '<strong>Temp:</strong>' + temp + " \u212A " + '</br>';
                bodyContentEl.innerHTML += '<strong>Wind:</strong>' + wind + '</br>';
                bodyContentEl.innerHTML += '<strong>Humidity:</strong>' + humidity + " \u0025 " + '</br>';

                

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
    localStorage.setItem('cityName', searchInputVal);
    getCoordinatesApi(searchInputVal) 

})