import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const WeatherWidget = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <div className='weather-widget' style={{ width: '800px', margin: 'auto' }}>
      <header>
        <h1>Weather Dashboard</h1>
        <button onClick={toggleTheme}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </button>
      </header>

      {/* TODO: Tabs: Current Weather / Forecast / Statistics */}
      {/* TODO: Add CitySelector, WeatherDisplay, ForecastList, etc. */}
    </div>
  );
};

export default WeatherWidget;
