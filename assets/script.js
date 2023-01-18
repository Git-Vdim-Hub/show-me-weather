//TO-DO
//1. add dayjs to html, call day js in script for todays date.
//2. read WX API docs
var apiKey = 'e22a952731360f3f21865b6d5114ce96';
var lon;
var lat;
var units;

function getWeather(lat, lon, cardNumber) {
    lat = lat;
    lon = lon;
    units = 'imperial';
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

    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response) {
          if(response.ok){
            response.json().then(function(data){
              //get new day data at 0(tomorrow), 8 (day+1), 16 (day+2),
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
              displayWeather(wxIcon1, temp1, wind1, humidity1, when1, wxIcon2, temp2, wind2, humidity2, when2, wxIcon3, temp3, wind3, humidity3, when3, cardNumber);
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

function displayDayWeather(functIcon, funcTemp, funcWind, funcHumidity, funcWhen){
    var mark = funcWhen;
    wxDateP = document.createElement('p');
    wxIconP = document.createElement('p');
    wxTempP = document.createElement('p');
    wxWindP = document.createElement('p');
    wxHumP = document.createElement('p');
    wxDateP.innerHTML = `${dayjs(mark).format('ddd, D MMM')}`;
    displayWeatherIcon(wxIconP, functIcon);
    wxTempP.innerHTML = `Temp: ${funcTemp} °F`;
    wxWindP.innerHTML = `Wind: ${funcWind} MPH`;
    wxHumP.innerHTML = `Humidity: ${funcHumidity} %`;
}

function displayWeather(functIcon1, funcTemp1, funcWind1, funcHumidity1, funcWhen1, functIcon2, funcTemp2, funcWind2, funcHumidity2, funcWhen2, functIcon3, funcTemp3, funcWind3, funcHumidity3, funcWhen3, cardNumber){
    wxEla = document.querySelector(`#wx-${cardNumber}a`);
    wxElb = document.querySelector(`#wx-${cardNumber}b`);
    wxElc = document.querySelector(`#wx-${cardNumber}c`);
    wxDay1Div = document.createElement('div');
    wxDay2Div = document.createElement('div');
    wxDay3Div = document.createElement('div');
    wxDay1Div.classList.add('card-body');
    wxDay2Div.classList.add('card-body');
    wxDay3Div.classList.add('card-body');
    wxEla.appendChild(wxDay1Div);
    displayDayWeather(functIcon1, funcTemp1, funcWind1, funcHumidity1, funcWhen1);
    wxDay1Div.appendChild(wxDateP);
    wxDay1Div.appendChild(wxIconP);
    wxDay1Div.appendChild(wxTempP);
    wxDay1Div.appendChild(wxWindP);
    wxDay1Div.appendChild(wxHumP);
    wxElb.appendChild(wxDay2Div);
    displayDayWeather(functIcon2, funcTemp2, funcWind2, funcHumidity2, funcWhen2);
    wxDay2Div.appendChild(wxDateP);
    wxDay2Div.appendChild(wxIconP);
    wxDay2Div.appendChild(wxTempP);
    wxDay2Div.appendChild(wxWindP);
    wxDay2Div.appendChild(wxHumP);
    wxElc.appendChild(wxDay3Div);
    displayDayWeather(functIcon3, funcTemp3, funcWind3, funcHumidity3, funcWhen3);
    wxDay3Div.appendChild(wxDateP);
    wxDay3Div.appendChild(wxIconP);
    wxDay3Div.appendChild(wxTempP);
    wxDay3Div.appendChild(wxWindP);
    wxDay3Div.appendChild(wxHumP);
  
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