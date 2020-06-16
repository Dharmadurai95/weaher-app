const form = document.querySelector('form');
const searchInput = document.querySelector('#search');
const submit = document.querySelector('#submit');

let weather_location = document.querySelector("#weather-location");
const description = document.querySelector("#weather-description");
const temperature = document.querySelector("#weather-temperature");
const feelslike = document.querySelector("#weather-feelslike");
const windDir = document.querySelector("#weather-windDir");
const rain_chances = document.querySelector("#rain-chances");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = searchInput.value
    weather_location.textContent = 'loading ....'
    fetch(`http://localhost:3000/weather?location=${location}`).then((response) => {
        response.json().then((data) => {
            
                if(!data.error){
                weather_location.textContent = `Your Current Location :${data.Current_Location}`;
                description.textContent = `Current Weather : ${data.Weather_Description}`;
                temperature.textContent = `Temperature : ${data.Temperature}`;
                rain_chances.textContent = ` There is ${data.chances_rain }% to chances of rain `;
                feelslike.textContent = `Feels like : ${data.Feels_Like}`;

                windDir.textContent = `Wind Direction : ${data.Wind_Direction}`;
                } else if( data.error) {
                    temperature.textContent = `${data.error}` 
                    weather_location.textContent='';
                    description.textContent='';
                    feelslike.textContent='';
                    windDir.textContent=''

                }
            }).catch((error) => {
                    console.log(error)
            })
    })
})