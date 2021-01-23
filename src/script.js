
 let now = new Date();

 
 let hours = now.getHours(); 
 if (hours < 10 ){
     hours =`0${hours}`;
 }
 let minutes = now.getMinutes();
  if (minutes < 10 ){
     minutes =`0${minutes}`;
 }


 let days = ["Sun", "Mon","tue","Wed","Thu","Fri","Sat"];
 let day = days[now.getDay()];

 let months = ["Jan","Feb","March","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
 let month = months[now.getMonth()];


 let dates = document.querySelector("#dates");
 dates.innerHTML = `${month}, ${day} ${hours}:${minutes}`;

 console.log (day)

// Fahrenheit- celsius //
 function displayFahrenheitTemperature (event) {
   event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
   let fahrenheitTemperature =(celsiusTemperature * 9/5) + 32;
   let temperatureElement = document.querySelector("#temperature");
   temperatureElement.innerHTML = Math.round(fahrenheitTemperature)
 }

 function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
 }
 let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature );

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature );

let celsiusTemperature = null;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round (response.data.wind.speed);
  document.querySelector("#icon").innerHTML = `<i class="${getIcon(
    response.data.weather[0].icon
  )}"></i>`;
  celsiusTemperature =Math.round(
    response.data.main.temp
  );
    console.log (response.data)
}

function getIcon(icon) {
  let iconClass = "";
  if (icon === "01d") {
    iconClass = `fas fa-sun`;
  } else if (icon === "01n") {
    iconClass = `far fa-moon`;
  } else if (icon === "02d") {
    iconClass = `fas fa-cloud-sun`;
  } else if (icon === "02n") {
    iconClass = `fas fa-cloud-moon`;
  } else if (icon === "03d") {
    iconClass = `fas fa-cloud`;
  } else if (icon === "03n") {
    iconClass = `fas fa-cloud`;
  } else if (icon === "04d") {
    iconClass = `fas fa-cloud`;
  } else if (icon === "04n") {
    iconClass = `fas fa-cloud`;
  } else if (icon === "09d") {
    iconClass = `fas fa-cloud-showers-heavy`;
  } else if (icon === "09n") {
    iconClass = `fas fa-cloud-moon-rain`;
  } else if (icon === "10d") {
    iconClass = `fas fa-cloud-sun-rain`;
  } else if (icon === "10n") {
    iconClass = `fas fa-cloud-moon-rain`;
  } else if (icon === "11d") {
    iconClass = `fas fa-poo-storm`;
  } else if (icon === "11n") {
    iconClass = `fas fa-poo-storm`;
  } else if (icon === "13d") {
    iconClass = `far fa-snowflake`;
  } else if (icon === "13n") {
    iconClass = `far fa-snowflakes`;
  } else if (icon === "50d") {
    iconClass = `fas fa-smog`;
  } else if (icon === "50n") {
    iconClass = `fas fa-smog`;
  }
  return iconClass;
}

function formatHours(timestamp){
  let time = new Date(timestamp);
let hours = time.getHours(); 
 if (hours < 10 ){
     hours =`0${hours}`;
 }
 let minutes = time.getMinutes();
  if (minutes < 10 ){
     minutes =`0${minutes}`;
 }
  return `${hours}:${minutes}`
};


function displayForecast(response)
{ 
  let forecastElement = document.querySelector("#forecast");
 forecastElement.innerHTML = null;

  for (let index =0 ; index<5; index++){
 let forecast = response.data.list[index];
 forecastElement.innerHTML += `
  <div class="card border-info mb-3" >
    <div class="card-header">${formatHours(forecast.dt*1000)}</div>
    <div class="card-body">
        <h5 class="card-title"><i class="${getIcon(forecast.weather[0].icon
  )}"></i> ${Math.round(forecast.main.temp_max)}°/${Math.round(forecast.main.temp_min)}°</h5>
        <ul class="card-text">
        <li> ${forecast.weather[0].main}
        </li>
        <li>
            Humidity: ${forecast.main.humidity}%
        </li>
        <li>
            Wind:${forecast.wind.speed} Km/h
        </li>
        </ul>
    </div>
</div>`;
  }

 
  console.log(response.data.list[0]);
}

function search(event) {
  event.preventDefault();
  let apiKey = "b3d3386d2b504627ac03fa173cbc37ca";
  let city = document.querySelector("#inputCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

  console.log(apiUrl);
}

console.log(axios);
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
