const WeatherIcons = {
    '01d': 'fa-sun',
    '01n': 'fa-moon',
    '02d': 'fa-cloud-sun',
    '02n': 'fa-cloud-moon',
    '03d': 'fa-cloud',
    '03n': 'fa-cloud',
    '04d': 'fa-cloud',
    '04n': 'fa-cloud',
    '09d': 'fa-cloud-rain',
    '09n': 'fa-cloud-rain',
    '10d': 'fa-cloud-sun-rain',
    '10n': 'fa-cloud-moon-rain',
    '11d': 'fa-bolt',
    '11n': 'fa-bolt',
    '13d': 'fa-snowflake',
    '13n': 'fa-snowflake',
    '50d': 'fa-smog',
    '50n': 'fa-smog'
}

const loading = document.getElementById("loading")

const error = document.getElementById("error")

const weatherContent = document.getElementById("weatherContent")

const displayWeather = (data) => {
        const temp = Math.round(data.main.temp)
        const icon =  WeatherIcons[data.weather[0].icon] || 'fa-sun'
        

        document.getElementById("temperature").textContent=`${temp}°C`
        
        document.getElementById("cityName").textContent= data.name
        document.getElementById("humidity").textContent= `${data.main.humidity}%`

        document.getElementById("windSpeed").textContent =`${data.wind.speed}km/h`

//wgere we get  inside ${} details from this link with city name roughly give kochi: https://api.openweathermap.org/data/2.5/weather?q=kochi&appid=dfd76b34841d5b062d770db7cb1822dd&units=metric , click pretty-print tick, so we can see how data stored eg, humidity is stored under main so we write ${data.main.humidity},

        const weatherIcon = document.getElementById("weatherIcon")
        weatherIcon.className = `fa-solid ${icon} weather-icon`
       
        weatherContent.classList.remove("d-none")
}
async function getWeatherData(){
        try{
            const city = document.getElementById("cityNameInput").value
           
            loading.classList.remove("d-none")
            error.classList.add("d-none")
             weatherContent.classList.add("d-none")
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dfd76b34841d5b062d770db7cb1822dd&units=metric`) //here units=metric we add additinaly to get accurate degree celcuis
            loading.classList.add("d-none")
            if(!response.ok){
                throw new Error("City Not Found")
            }

            const data = await response.json()
            displayWeather(data)
        }
        catch(err){
            error.textContent = err.message ==='city not found' ? 'city not found. Try another city' : "failed to fetch data . refresh the page and  try again"
            error.classList.remove("d-none")
        }
}
