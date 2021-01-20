
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

  document.querySelector("#icon").innerHTML = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  
    console.log (response.data)
}

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
