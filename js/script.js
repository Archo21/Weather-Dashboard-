moment().format("L")
var UserCitySearch = document.getElementById("searchForm")
var ApiKey = "4a093989cb6c6f9602f38de0b1bf3e1a"
var citySearch = document.getElementById("city-input");
var weathercard = document.getElementById("weathercards")
var forcastdiv = document.getElementById("forcast")
var searchHistory = []
var searchHistoryDiv = document.getElementById("search-history")

function fetchcoords(search) {
    console.log(search);

    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=5&appid=" + ApiKey
    fetch(url)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            if (!data[0]) {
                alert("location not found")

            } else {
                console.log(data[0]);
                const lat = data[0].lat
                const lon = data[0].lon
                weather(lat, lon)
                addHistory(search)
            }

        })
        .catch(function (err) {
            console.log(err);
        })
}

function weather(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=${ApiKey}`
    fetch(url)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            //    console.log(data);
            renderWeatherData(data.current)
            renderCards(data.daily)
        })

        // call renderWeatherData function and pass it the

        .catch(function (err) {
            console.log(err);
        })
}

function renderWeatherData(response) {

    var tempF = response.temp;
    var wind_speedMph = response.wind_speed;
    var humidity = response.humidity;
    var uvi = response.uvi;
    var pressure = response.pressure
    console.log(tempF);
    //var citySearchEl = $("<h3>").text(response.name);
    //  var displayMainDate = citySearchEl.append(" " + mainDate);
    var card = document.createElement("div")
    var cardBody = document.createElement("div")
    var tempEl = document.createElement("p")
    var humidityEl = document.createElement("p")
    var wind_speedEl = document.createElement("p")
    var uviEl = document.createElement("p")
    var pressureEl = document.createElement("p")
    var currentweather = response.weather[0].main;
    card.setAttribute("class", "card")
    cardBody.setAttribute("class", "card-body")
    card.append(cardBody)


    // createElement, textContent, append, innerHTMl
    // target current weather section and render data to page
    // then loop over the remaining daily forecast, dynamically create html for each day's weather data and render that to the forecast section of your html
    if (currentweather === "Rain") {

        var currentIcon = document.createElement('img')
        currentIcon.setAttribute("src", "http://openweathermap.org/img/w/09d.png");
        currentIcon.setAttribute("style", "height: 60px; width: 60px");
    } else if (currentweather === "Clouds") {
        var currentIcon = document.createElement('img')
        currentIcon.setAttribute("src", "http://openweathermap.org/img/w/03d.png");
        currentIcon.setAttribute("style", "height: 60px; width: 60px");
    } else if (currentweather === "Clear") {
        var currentIcon = document.createElement('img')
        currentIcon.setAttribute("src", "http://openweathermap.org/img/w/01d.png");
        currentIcon.setAttribute("style", "height: 60px; width: 60px");
    } else if (currentweather === "Drizzle") {
        var currentIcon = document.createElement('img')
        currentIcon.setAttribute("src", "http://openweathermap.org/img/w/10d.png");
        currentIcon.setAttribute("style", "height: 60px; width: 60px");
    } else if (currentweather === "Snow") {
        var currentIcon = document.createElement('img')
        currentIcon.setAttribute("src", "http://openweathermap.org/img/w/13d.png");
        currentIcon.setAttribute("style", "height: 60px; width: 60px");
    }
    // console.log(tempEl)
    tempEl.textContent = `Temp: ${tempF}°F`;
    wind_speedEl.textContent = `wind_speed: ${wind_speedMph}°Mph`;
    humidityEl.textContent = `humidity: ${humidity}°%`;
    uviEl.textContent = `uv_index: ${uvi}°`;
    pressureEl.textContent = `Pressure: ${pressure}°`;

    cardBody.append(tempEl, wind_speedEl, humidityEl, uviEl, pressureEl, currentIcon)
    weathercard.innerHTML = ""
    weathercard.append(card)

}

var display5Day = function (weather,) {
    var timeDate = weather.dt
    var currentTime = moment.unix(timeDate).format("MM/DD/YYYY");
    var currentIcon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var weatherDescription = weather.weather[0].description
    var Temp = weather.temp.day
    var humidity = weather.humidity
    var wind_speed =weather.wind_speed
    var uvi=weather.uvi
    var col = document.createElement("div")
    var card = document.createElement("div")
    var cardBody = document.createElement("div")
    var forcast = document.createElement("h4")
    var weatherIcon = document.createElement("img")
    var TempP = document.createElement("p")
    var wind_speedM = document.createElement("p")
    var humidityH = document.createElement("p")
    var uviU= document.createElement("p")
    var weather_description = document.createElement("p")

    col.append(card)
    card.append(cardBody)
    cardBody.append(forcast, weatherIcon, TempP,wind_speedM,humidityH,uviU, weather_description)
    col.setAttribute("class", "col-md")
    card.setAttribute("class", "card")
    cardBody.setAttribute("class", "card-body p-2")
    forcast.setAttribute("class", "card-title")
    weatherIcon.setAttribute("src", currentIcon)
    TempP.setAttribute("class", "card-text")
    wind_speedM.setAttribute("class", "card-text")
    humidityH.setAttribute("class", "card-text")
    uviU.setAttribute("class", "card-text")
    weather_description.setAttribute("class", "card-text")
    //var forecast = weather.classlist;
    //for(var i=5; i < forecast.length; i=i+8){
    //var dailyForecast = forecast[i];
    forcast.textContent = currentTime
    TempP.textContent = "Temp "+ Temp + "°F"
    wind_speedM.textContent = wind_speed + "°Mph"
    humidityH.textContent = humidity + "°%"
    uviU.textContent = uvi + "°"
    weather_description.textContent = weatherDescription


    forcastdiv.append(col)
};

function renderCards(forecast) {
    console.log(forecast);
    forcastdiv.innerHTML = ""
    var startDate = forecast[0].dt
    var endDate = forecast[4].dt
    for (var i = 0; i < forecast.length; i++) {
        if (forecast[i].dt >= startDate && forecast[i].dt <= endDate) {
            display5Day(forecast[i])
        }
    }
}

function rendersearchHistory() {
    searchHistoryDiv.innerHTML=""
    for (var i = searchHistory.length - 1; i >= 0; i--) {
        var button = document.createElement("button");
        button.setAttribute("class", "historybutton")
        //button.classList.add("historybutton")
        button.setAttribute("data-history", searchHistory[i])
        button.textContent = searchHistory[i]
        searchHistoryDiv.append(button)
    }

}

function addHistory(search) {
    if (searchHistory.indexOf(search) !== -1) {
        return
    }
    searchHistory.push(search)
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
    rendersearchHistory()
}

function pageLoad() {
    var lastSearch = localStorage.getItem("searchHistory");
    if (lastSearch) {
        searchHistory = JSON.parse(lastSearch)
    }

    rendersearchHistory()
}
function handlesearchbutton(e){
if (!e.target.matches(".historybutton")){return}
var button = e.target
var search = button.getAttribute("data-history")
console.log(search);
fetchcoords(search)
}

function handlesearchsubmit(e) {
    e.preventDefault()
    var search = citySearch.value.trim()
    console.log(search);
    fetchcoords(search)
}
//Event deligation...
//$("#select-city").on("click", handlesearchsubmit)
UserCitySearch.addEventListener('submit', handlesearchsubmit);
document.addEventListener("click",handlesearchbutton);
//searchHistoryDiv.addEventListener("click",handlesearchbutton)
pageLoad()