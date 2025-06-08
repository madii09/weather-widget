# 🌤️ Weather Widget A sleek, customizable weather widget built with React + Vite, featuring real-time

> weather data, forecast tabs, theming, and persistent user settings. Powered by the OpenWeatherMap
> API.

### 🚀 Features

- 🌆 Select between 5 cities (London, New York, Tokyo, Sydney, Cairo)

- 🌡️ Toggle temperature units (°C / °F)

- 🔄 Auto-refresh with configurable interval

- 📅 View current weather and 6-day forecast

- ⚙️ Settings panel with local persistence (unit lock, wind/description toggles)

- 🌓 Light/Dark mode with theme switcher

- 🎨 Responsive design with Tailwind CSS

### 💡 Custom Features

- 🔍 **Debounced Search Input** in CitySelector (300ms delay) for better performance on city
  filtering
- ⚙️ Theme and Unit toggles with persistent state

### 🔧 Tech Stack

- React with Hooks and Context API

- Vite for fast development

- Tailwind CSS for styling

- OpenWeatherMap API (free tier)

- Vitest + React Testing Library for testing

## 📦 Setup

```bash
git clone https://github.com/madii09/weather-widget.git
cd weather-widget
npm install
npm run dev
```

## 🌐 API Key

```
VITE_WEATHER_API_KEY=your_api_key_here
```

## 🛠️ Run Locally

```bash
npm run dev
```
