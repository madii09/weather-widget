export const BASE_CURRENT = 'https://api.openweathermap.org/data/2.5/weather/';
export const BASE_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast/';

export const CITIES = ['London', 'New York', 'Tokyo', 'Sydney', 'Cairo'];

export const SETTINGS_LOCAL_STORAGE_KEY = 'weatherWidgetSettings';

export const AVAILABLE_TABS = {
	current: 'Current',
	forecast: '6 Day Forecast',
};

export const TABS_DATA = [
	{
		id: 1,
		label: AVAILABLE_TABS.current,
		active: true,
	},
	{
		id: 2,
		label: AVAILABLE_TABS.forecast,
		active: false,
	},
];
