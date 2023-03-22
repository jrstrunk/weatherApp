let searchForm = document.querySelector("#searchForm");
let cityInput = document.querySelector("#cityInp");
let stateInput = document.querySelector("#stateInp");
let mainContent = document.querySelector("#main");

let resetBTN = document.querySelector("#reset");

resetBTN.addEventListener('click', () => {
    mainContent.classList.add("Hide");
    cityInput.value = '';
    stateInput.value = '';
})

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    mainContent.classList.remove("Hide");
    let city = cityInput.value;
    let state = stateInput.value;

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=${city},${state}&iconSet=icons1&aggregateHours=24&forecastDays=5&unitGroup=us&shortColumnNames=false&contentType=json&key=95VXDF2FPLW35MCG9BJ7VZ6WC`, {
        method: 'GET', 
        headers: { },
    }).then((response) => response.json())
    .then((data) => {
        let city = cityInput.value;
        let selectedCity = document.querySelector("#selectedCity");
        let actualTemp = document.querySelector("#actualTemp");
        let currentlyFeels = document.querySelector("#currentlyFeels");

        let location = data.locations[Object.keys(data.locations)[0]]

        selectedCity.innerText = city + "'s Current Weather";
        actualTemp.innerText = "Temprature " + location.currentConditions.temp + "°F";
        let wind = location.currentConditions.windchill;

        if(!wind === null){
            currentlyFeels.innerText = "Feels Like " + wind + "°F";
        } else{
            currentlyFeels.innerText = "Feels Like " + location.values[0].temp + "°F";
        }

        let weather = document.querySelector("#weather");
        weather.innerText = location.values[0].conditions;

        let dates = document.querySelectorAll(".date");

        for(let i = 0; i < location.values.length; i++){
            let date = (location.values[i].datetimeStr);
            let newDate = date.substring(0,10);
            dates[i].innerText = newDate;
        }

        let highs = document.querySelectorAll(".high");

        for(let i =0; i< location.values.length; i++){
            let high = (location.values[i].maxt);
            highs[i].innerText = "High: " + high + "°F";
        }

        let lows = document.querySelectorAll(".low");

        for(let i =0; i< location.values.length; i++){
            let low = (location.values[i].mint);
            lows[i].innerText = "Low: " + low + "°F";
        }

        let feels = document.querySelectorAll(".feels");

        for(let i = 0; i < location.values.length; i++){
            let feel = (location.values[i].windchill);
            if(!feel === null){
                feels[i].innerText = "Feels like: " + feel + "°F";
            }
            else{
                let temp = (location.values[i].temp);
                feels[i].innerText = "Feels like: " + temp + "°F";
            }
            
        }

        let temps = document.querySelectorAll(".temp");

        for(let i = 0; i < location.values.length; i++){
            let temp = (location.values[i].temp);
            let condition = (location.values[i].conditions);
            temps[i].innerText = condition + " and " + temp + "°F";
        }

        let days = document.querySelectorAll(".day");

        for(let i = 0; i < location.values.length; i++){
            let day = (location.values[i].datetimeStr);
            let newday = getDayName(day, "en-US");
            days[i].innerText = newday;
        }

        let validIconNames = ["rain", "wind", "fog", "snow", "partly-cloudy-day", "partly-cloudy-night", "clear-day", "clear-night"];

        for (let i = 0; i < location.values.length; i++) {
            let day = document.querySelector(`#day${i + 1}`);
            let icon = location.values[i].icon;

            if (validIconNames.includes(icon)) {
                day.src = `${icon}.png`;
            } else {
                day.src = "partly-cloudy-day.png";
            }
        }
    }); 
})

function getDayName(dateStr, local){
    var date = new Date(dateStr);
    return date.toLocaleDateString(local, {weekday: 'long'});
}