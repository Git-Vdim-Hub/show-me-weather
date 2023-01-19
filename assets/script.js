
var apiKey = 'e22a952731360f3f21865b6d5114ce96';
var lon;
var lat;
var units = 'imperial';
var searchButton = document.querySelector('#wxSearch');
var cityInput = document.querySelector('#cityInput');
var priorSearch = document.querySelector('#priorSearch');
//listening for clicks on seach button to pass in city name and retrieve the local storage
searchButton.addEventListener('click', function(event){
  console.log(cityInput.value);
  if(cityInput.value !== undefined && cityInput.value !== null && cityInput.value !== ''){
    getWxLatLon(cityInput.value);
    saveToLocalStorage(cityInput.value);
    retrieveLocalStorage();
  }
});
//listening for clicks on prior searches
priorSearch.addEventListener('click', function(event){
  getWxLatLon(event.target.textContent);
})
//gets the current weather and the latitude and longitude of the city passed in
function getWxLatLon(cityName){
  var requestGEO = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;
  fetch(requestGEO)
    .then(function (response) {
      if(response.ok){
        response.json().then(function(data){
          //temp, wind, wxIcon, humidity, dtg
        //console.log(data);
        lat = data.coord.lat;
        lon = data.coord.lon;
        var cityName = data.name;
        var temp = data.main.temp;
        var wind = data.wind.speed;
        var icon = data.weather[0].icon;
        var hum = data.main.humidity;
        displayWeather(cityName, icon, temp, wind, hum);
        getForecast(lat, lon);
        });
      } else{
          alert('Error: '+ response.statusText);
        }

    })
      .catch(function(error){
      alert('Unable to connect to geocoding API');
        })
}
//retrieves the forecast for the weather API and calls todays forecast with the data to display
function getForecast(lat, lon) {
    var temp1;
    var wind1;
    var wxIcon1;
    var humidity1;
    var when1;

    var temp2;
    var wind2;
    var wxIcon2;
    var humidity2;
    var when2;

    var temp3;
    var wind3;
    var wxIcon3;
    var humidity3;
    var when3;

    var temp4;
    var wind4;
    var wxIcon4;
    var humidity4;
    var when4;

    var temp5;
    var wind5;
    var wxIcon5;
    var humidity5;
    var when5;

    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response) {
          if(response.ok){
            response.json().then(function(data){
              //get new day data at 0(tomorrow), 8 (day+1), 16 (day+2) 24 (day+3) 32 (day+4),
              //temp, wind, wxIcon, humidity, dtg
              //console.log(data);
              temp1 = data.list[0].main.temp;
              wind1 = data.list[0].wind.speed;
              wxIcon1 = data.list[0].weather[0].icon;
              humidity1 = data.list[0].main.humidity;
              when1 = data.list[0].dt_txt;

              temp2 = data.list[8].main.temp;
              wind2 = data.list[8].wind.speed;
              wxIcon2 = data.list[8].weather[0].icon;
              humidity2 = data.list[8].main.humidity;
              when2 = data.list[8].dt_txt;
              
              temp3 = data.list[16].main.temp;
              wind3 = data.list[16].wind.speed;
              wxIcon3 = data.list[16].weather[0].icon;
              humidity3 = data.list[16].main.humidity;
              when3 = data.list[16].dt_txt;

              temp4 = data.list[24].main.temp;
              wind4 = data.list[24].wind.speed;
              wxIcon4 = data.list[24].weather[0].icon;
              humidity4 = data.list[24].main.humidity;
              when4 = data.list[24].dt_txt;

              temp5 = data.list[32].main.temp;
              wind5 = data.list[32].wind.speed;
              wxIcon5 = data.list[32].weather[0].icon;
              humidity5 = data.list[32].main.humidity;
              when5 = data.list[32].dt_txt;
              displayForecast(wxIcon1, temp1, wind1, humidity1, when1, wxIcon2, temp2,
                 wind2, humidity2, when2, wxIcon3, temp3, wind3, humidity3, when3, wxIcon4,
                  temp4, wind4, humidity4, when4, wxIcon5, temp5, wind5, humidity5, when5);
            });
          } else{
            alert('Error: '+ response.statusText);
          }

        })
        .catch(function(error){
          alert('Unable to connect to openweathermap API');
        })
}
//displays the weather icon
function displayWeatherIcon(appendEl, iconCode){
    var imgEl = document.createElement("img");
    imgEl.src = `http://openweathermap.org/img/wn/${iconCode}.png`
    appendEl.appendChild(imgEl);
}
//displays today's weather calls the weather icon and day js for the current date
function displayWeather(cityName, icon, temp, wind, hum){
  var date = dayjs().format('ddd, D MMM YY');
  var weatherDisplay = document.querySelector('#day0');
  weatherDisplay.innerHTML = '';
  var innerDiv = document.createElement('div');
  innerDiv.classList.add('card-body', 'border', 'border-success');
  var h4El = document.createElement('h4');
  var tempP = document.createElement('p');
  var windP = document.createElement('p');
  var humP = document.createElement('p');
  h4El.innerHTML = `${cityName} (${date})`
  h4El.classList.add('card-title', 'text-start');
  tempP.classList.add('card-text', 'text-start');
  windP.classList.add('card-text', 'text-start');
  humP.classList.add('card-text', 'text-start');
  weatherDisplay.appendChild(innerDiv);
  innerDiv.appendChild(h4El);
  displayWeatherIcon(h4El, icon);
  tempP.innerHTML = `Temp: ${temp}°F`
  windP.innerHTML = `Winds: ${wind} MPH`
  humP.innerHTML = `Humidity: ${hum} %`
  innerDiv.appendChild(tempP);
  innerDiv.appendChild(windP);
  innerDiv.appendChild(humP);
  
}
//displays each of the days of the five day forecast
function displayDayForecast(functIcon, funcTemp, funcWind, funcHumidity, funcWhen, dayNum){
    var mark = funcWhen;
    wxEl = document.querySelector(`#day${dayNum}`);
    wxEl.innerHTML = '';
    wxDateP = document.createElement('h6');
    wxDateP.classList.add('card-title');
    wxIconP = document.createElement('p');
    wxIconP.classList.add('card-text');
    wxTempP = document.createElement('p');
    wxTempP.classList.add('card-text');
    wxWindP = document.createElement('p');
    wxWindP.classList.add('card-text', 'text-start');
    wxHumP = document.createElement('p');
    wxHumP.classList.add('card-text', 'text-start');
    wxDateP.innerHTML = `${dayjs(mark).format('ddd, D MMM YY')}`;
    displayWeatherIcon(wxIconP, functIcon);
    wxTempP.innerHTML = `Temp: ${funcTemp} °F`;
    wxWindP.innerHTML = `Wind: ${funcWind} MPH`;
    wxHumP.innerHTML = `Humidity: ${funcHumidity} %`;
    wxEl.appendChild(wxDateP);
    wxEl.appendChild(wxIconP);
    wxEl.appendChild(wxTempP);
    wxEl.appendChild(wxWindP);
    wxEl.appendChild(wxHumP);
}
// displays the five day forecast
function displayForecast(functIcon1, funcTemp1, funcWind1, funcHumidity1, funcWhen1, functIcon2, funcTemp2,
  funcWind2, funcHumidity2, funcWhen2, functIcon3, funcTemp3, funcWind3, funcHumidity3, funcWhen3,
  functIcon4, funcTemp4, funcWind4, funcHumidity4, funcWhen4, functIcon5, funcTemp5, funcWind5, funcHumidity5, funcWhen5,){
  displayDayForecast(functIcon1, funcTemp1, funcWind1, funcHumidity1, funcWhen1, 1);
  displayDayForecast(functIcon2, funcTemp2, funcWind2, funcHumidity2, funcWhen2, 2);
  displayDayForecast(functIcon3, funcTemp3, funcWind3, funcHumidity3, funcWhen3, 3);
  displayDayForecast(functIcon4, funcTemp4, funcWind4, funcHumidity4, funcWhen4, 4);
  displayDayForecast(functIcon5, funcTemp5, funcWind5, funcHumidity5, funcWhen5, 5);
};
//saves your search to local storage
function saveToLocalStorage(searchValue){
  var storedArray = JSON.parse(localStorage.getItem("localStorage"));
  if(storedArray !== undefined && storedArray !== null){
    if(storedArray.includes(searchValue)){
      return;
    }
    storedArray.push(searchValue);
    localStorage.setItem('localStorage', JSON.stringify(storedArray));
  } else{
    storedArray = [];
    storedArray.push(searchValue);
    localStorage.setItem('localStorage', JSON.stringify(storedArray));
  }
}
//gets the local storage and displays the prior searches on the left hand side
function retrieveLocalStorage(){
  var retrievedArray = JSON.parse(localStorage.getItem("localStorage"));
  priorSearchEl = document.querySelector('#priorSearch');
  priorSearchEl.innerHTML = '';
  if(retrievedArray !== undefined && retrievedArray !== null){
    for(var i = 0; i<retrievedArray.length; i++){
      liEl = document.createElement('li');
      liEl.classList.add('list-group-item', 'list-group-item-action', 'm-2', 'border-2', 'border', 'border-success');
      liEl.innerHTML = retrievedArray[i];
      liEl.id = `search${i}`;
      priorSearchEl.appendChild(liEl);
    }
  }
}
//initializes the website
function init(){
  retrieveLocalStorage();
  getWxLatLon('Rochester');
}
init();