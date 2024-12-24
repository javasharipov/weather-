const searchInput = document.querySelector('.search__input input')
const locationEl = document.querySelector('.first__child h2')
const imgEl = document.querySelector('.first__child__image img')
const tempEl = document.querySelector('.first__child__content strong')
const rainChanceEl = document.querySelector('.first__child__content span')
const forecastWrapper = document.querySelector('.weather__forecast')

const BASE_URL =
	'https://api.weatherapi.com/v1/forecast.json?key=3cd5e30a82be470792b190034242312&q='

async function fetchWeather(city = 'Tashkent') {
	try {
		const response = await fetch(`${BASE_URL}${city}&days=7&aqi=no&alerts=no`)
		const res = await response.json()

		locationEl.textContent = `${res.location.name}, ${res.location.country}`
		tempEl.innerHTML = `${res.current.temp_c} <sup>o</sup>`
		rainChanceEl.textContent = `Chance of rain: ${res.current.condition.text}`
		imgEl.src = `https:${res.current.condition.icon}`

		forecastWrapper.innerHTML = `<span>7-DAY FORECAST</span>`
		res.forecast.forecastday.forEach(day => {
			const forecastHTML = `
                <div class="info__forecast">
                    <h4>${new Date(day.date).toLocaleDateString('en-US', {
											weekday: 'long',
										})}</h4>
                    <div class="info__img">
                        <img width="50" src="https:${
													day.day.condition.icon
												}" alt="">
                        <span>${day.day.condition.text}</span>
                    </div>
                    <p>${day.day.maxtemp_c}/${day.day.mintemp_c} °C</p>
                </div>
            `
			forecastWrapper.innerHTML += forecastHTML
		})
	} catch (error) {
		console.error('Error fetching weather data:', error)
	}
}

searchInput.addEventListener('change', () => {
	const city = searchInput.value.trim()
	if (city) {
		fetchWeather(city)
	}
})

window.onload = () => {
	fetchWeather()
}
