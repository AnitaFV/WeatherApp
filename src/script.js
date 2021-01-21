
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

 function convertToFahrenheit(event){
     event.preventDefault();
 let temperatureElement = document.querySelector("#temperature");

 let temperature = temperatureElement.innerHTML;
 temperatureElement.innerHTML = Math.round ((temperature *9)/ 5 + 32);

 }
 let FahrenheitLink = document.querySelector("#Fahrenheit-link");
FahrenheitLink.addEventListener("click", convertToFahrenheit );

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
    console.log (response.data)
}

function getIcon(icon) {
  let iconClass = "";
  if (icon === "01d") {
    iconClass = `fal fa-sun`;
  } else if (icon === "01n") {
    iconClass = `fal fa-moon-stars`;
  } else if (icon === "02d") {
    iconClass = `fal fa-cloud-sun`;
  } else if (icon === "02n") {
    iconClass = `fal fa-moon-cloud`;
  } else if (icon === "03d") {
    iconClass = `fal fa-cloud`;
  } else if (icon === "03n") {
    iconClass = `fal fa-cloud`;
  } else if (icon === "04d") {
    iconClass = `fal fa-clouds-sun`;
  } else if (icon === "04n") {
    iconClass = `fal fa-clouds-moon`;
  } else if (icon === "09d") {
    iconClass = `fal fa-cloud-showers-heavy`;
  } else if (icon === "09n") {
    iconClass = `fal fa-cloud-moon-rain`;
  } else if (icon === "10d") {
    iconClass = `fal fa-cloud-sun-rain`;
  } else if (icon === "10n") {
    iconClass = `fal fa-cloud-moon-rain`;
  } else if (icon === "11d") {
    iconClass = `fal fa-thunderstorm-sun`;
  } else if (icon === "11n") {
    iconClass = `fal fa-thunderstorm-moon`;
  } else if (icon === "13d") {
    iconClass = `fal fa-snowflake`;
  } else if (icon === "13n") {
    iconClass = `fal fa-snowflakes`;
  } else if (icon === "50d") {
    iconClass = `fal fa-fog`;
  } else if (icon === "50n") {
    iconClass = `fal fa-fog`;
  }
  return iconClass;

function search(event) {
  event.preventDefault();
  let apiKey = "b3d3386d2b504627ac03fa173cbc37ca";
  let city = document.querySelector("#inputCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  console.log(apiUrl);
}
console.log(axios);
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
