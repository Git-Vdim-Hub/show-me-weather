
var apiKey = 'e22a952731360f3f21865b6d5114ce96';
var lon;
var lat;
var units = 'imperial';
var searchButton = document.querySelector('#wxSearch');
var cityInput = document.querySelector('#cityInput');

searchButton.addEventListener('click', function(event){
  getWxLatLon(cityInput.value);
});

function getWxLatLon(cityName){
  var requestGEO = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;
  fetch(requestGEO)
    .then(function (response) {
      if(response.ok){
        response.json().then(function(data){
          //temp, wind, wxIcon, humidity, dtg
        console.log(data);
        lat = data.coord.lat;
        lon = data.coord.lon;
        var cityName = data.name;
        var temp = data.main.temp;
        var wind = data.wind.speed;
        var icon = data.weather[0].icon;
        console.log(icon);
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

function displayWeatherIcon(appendEl, iconCode){
    var imgEl = document.createElement("img");
    imgEl.src = `http://openweathermap.org/img/wn/${iconCode}.png`
    appendEl.appendChild(imgEl);
}

function displayWeather(cityName, icon, temp, wind, hum){
  var date = dayjs().format('ddd, D MMM YY');
  console.log (date);
  var weatherDisplay = document.querySelector('#day0');
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

function displayDayForecast(functIcon, funcTemp, funcWind, funcHumidity, funcWhen, dayNum){
    var mark = funcWhen;
    wxEl = document.querySelector(`#day${dayNum}`);
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

function displayForecast(functIcon1, funcTemp1, funcWind1, funcHumidity1, funcWhen1, functIcon2, funcTemp2,
   funcWind2, funcHumidity2, funcWhen2, functIcon3, funcTemp3, funcWind3, funcHumidity3, funcWhen3,
    functIcon4, funcTemp4, funcWind4, funcHumidity4, funcWhen4, functIcon5, funcTemp5, funcWind5, funcHumidity5, funcWhen5,){
    displayDayForecast(functIcon1, funcTemp1, funcWind1, funcHumidity1, funcWhen1, 1);
    displayDayForecast(functIcon2, funcTemp2, funcWind2, funcHumidity2, funcWhen2, 2);
    displayDayForecast(functIcon3, funcTemp3, funcWind3, funcHumidity3, funcWhen3, 3);
    displayDayForecast(functIcon4, funcTemp4, funcWind4, funcHumidity4, funcWhen4, 4);
    displayDayForecast(functIcon5, funcTemp5, funcWind5, funcHumidity5, funcWhen5, 5);
  };

  function saveToLocalStorage(searchValue){
    var number = JSON.parse(localStorage.getItem("searchNumber"));
    if(number !== undefined && number !== null){
      number++;
      localStorage.setItem("searchNumber", JSON.stringify(number));
      localStorage.setItem(`search${number}`, JSON.stringify(searchValue));
    } else{
      number = 1;
      localStorage.setItem("searchNumber", JSON.stringify(number));
      localStorage.setItem(`search${number}`, JSON.stringify(searchValue));
    }
  }

  function retrieveLocalStorage(){
    var number = JSON.parse(localStorage.getItem("searchNumber"));
    dropDownEl = document.querySelector('#dropDown');
    if(number !== undefined && number !== null){
      for(var i = 1; i<=number; i++){
        liEl = document.createElement('li');
        liEl.classList.add('nav-item');
        var aEl = document.createElement('a');
        aEl.classList.add('nav-link', 'fs-4', 'title');
        aEl.innerHTML = JSON.parse(localStorage.getItem(`search${i}`));
        dropDownEl.appendChild(liEl);
        liEl.appendChild(aEl);
      }
    }
  }