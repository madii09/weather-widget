import { useEffect, useReducer, useRef } from 'react';
import {
	CHANGE_CITY,
	CLEAR_ERROR,
	FETCH_WEATHER,
	initialState,
	SET_ERROR,
	SET_REFRESH_RATE,
	START_FETCH,
	TOGGLE_UNIT,
	weatherReducer,
} from '../../state';
import { BASE_CURRENT, BASE_FORECAST, formatDateTime, getEnvVariable } from '../../utils';

const API_KEY = getEnvVariable('OPEN_WEATHER_API_KEY');

const fetchForecast = async (city, unit) => {
	const url = `${BASE_FORECAST}?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Forecast fetch failed: ${res.statusText}`);
	return await res.json();
};

const fetchCurrentWeather = async (lat, lon, unit) => {
	const url = `${BASE_CURRENT}?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Current weather fetch failed: ${res.statusText}`);
	return await res.json();
};

export const useWeatherData = () => {
	const [state, dispatch] = useReducer(weatherReducer, initialState);
	const { city, unit, refreshRate } = state;
	const intervalRef = useRef(null);

	const fetchAllWeather = async () => {
		dispatch({ type: START_FETCH });
		try {
			const forecastData = await fetchForecast(city, unit);
			const { lat, lon } = forecastData.city.coord;
			const currentData = await fetchCurrentWeather(lat, lon, unit);
			const transformed = {
				current: {
					city: currentData.name,
					temp: currentData.main.temp,
					description: currentData.weather[0].description,
					icon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`,
					updatedAt: formatDateTime(currentData.dt * 1000),
				},
				forecast: forecastData.list.map(entry => ({
					time: formatDateTime(entry.dt_txt),
					temp: entry.main.temp,
					description: entry.weather[0].description,
					icon: `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`,
				})),
			};

			dispatch({ type: FETCH_WEATHER, payload: transformed });
		} catch (err) {
			dispatch({ type: SET_ERROR, payload: err.message });
		}
	};

	useEffect(() => {
		fetchAllWeather();
	}, [city, unit]);

	useEffect(() => {
		if (refreshRate === null) return;

		const setupInterval = async () => {
			const forecastData = await fetchForecast(city, unit);
			const { lat, lon } = forecastData.city.coord;

			intervalRef.current = setInterval(
				async () => {
					try {
						const currentData = await fetchCurrentWeather(lat, lon, unit);
						dispatch({
							type: FETCH_WEATHER,
							payload: {
								current: {
									city: currentData.name,
									temp: currentData.main.temp,
									description: currentData.weather[0].description,
									icon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`,
									updatedAt: formatDateTime(currentData.dt * 1000),
								},
								forecast: state.forecast, // keep existing forecast
							},
						});
					} catch (err) {
						dispatch({ type: SET_ERROR, payload: err.message });
					}
				},
				refreshRate * 60 * 1000,
			);
		};

		setupInterval();

		return () => clearInterval(intervalRef.current);
	}, [refreshRate, city, unit]);

	const changeCity = newCity => dispatch({ type: CHANGE_CITY, payload: newCity });
	const toggleUnit = () => dispatch({ type: TOGGLE_UNIT });
	const clearError = () => dispatch({ type: CLEAR_ERROR });
	const setRefreshRate = minutes => dispatch({ type: SET_REFRESH_RATE, payload: minutes });

	return {
		...state,
		changeCity,
		toggleUnit,
		clearError,
		setRefreshRate,
	};
};
