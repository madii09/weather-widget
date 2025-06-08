import { useContext, useState } from 'react';
import { ThemeContext } from '../../App';
import logo from '../../assets/weather-app.png';
import { useSettings, useWeatherData } from '../../hooks';
import { AVAILABLE_TABS, getUnitLabel, TABS_DATA } from '../../utils';
import { CitySelector } from '../CitySelector';
import { ForecastList } from '../ForecastList';
import { SettingsPanel } from '../SettingsPanel';
import { WeatherDisplay } from '../WeatherDisplay';

const btnBase =
	'px-4 py-2 rounded-md bg-[#0d6efd] text-white font-medium hover:opacity-90 cursor-pointer';

export const WeatherWidget = () => {
	const { isDark, toggleTheme } = useContext(ThemeContext);
	const [tabs, setTabs] = useState(TABS_DATA);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const { city, unit, current, forecast, error, loading, toggleUnit, changeCity, setRefreshRate } =
		useWeatherData();

	const [settings, dispatchSettings] = useSettings();
	const { isUnitLocked, displayOptions } = settings;

	const handleTabClick = id => {
		setTabs(prevTabs => {
			const currentActive = prevTabs.find(tab => tab.active);

			if (currentActive?.id === id) return prevTabs;

			return prevTabs.map(tab => ({
				...tab,
				active: tab.id === id,
			}));
		});
	};

	const activeTab = label => {
		return tabs.find(tab => tab.label === label).active;
	};

	return (
		<div
			className={`min-h-screen overflow-y-auto ${
				isDark ? 'bg-[#212529] text-[#f8f9fa]' : 'bg-[#f8f9fa] text-[#212529]'
			}`}
		>
			<div className='max-w-4xl w-full mx-auto p-4 sm:p-6'>
				<header className='flex flex-col sm:flex-row items-center justify-between mb-4 gap-4'>
					<div className='w-[80px] flex-shrink-0'>
						<img src={logo} alt='logo' className='w-full h-auto' />
					</div>

					<div className='flex gap-2 items-center'>
						<button onClick={toggleTheme} className={`${btnBase}`}>
							{isDark ? '☀️' : '🌙 '}
						</button>
						<button
							disabled={isUnitLocked}
							onClick={toggleUnit}
							className={`px-4 py-2 rounded-md font-medium border ${
								isUnitLocked ? 'opacity-50 cursor-not-allowed border-gray-300' : `${btnBase}`
							}`}
						>
							{getUnitLabel(unit)}
						</button>
						<button
							onClick={() => setIsSettingsOpen(true)}
							className={`${btnBase}  h-10 items-center`}
							title='Settings'
						>
							⚙️
						</button>
					</div>
				</header>

				<div className='relative w-full max-w-xs mb-6 mx-auto sm:mx-0'>
					<CitySelector currentCity={city} onSelectCity={c => changeCity(c)} />
				</div>

				<div className='flex flex-wrap justify-around my-6 rounded-lg bg-white/10 p-1 gap-2'>
					{tabs.map(({ id, label, active }) => (
						<button
							key={id}
							onClick={() => handleTabClick(id)}
							className={`flex-1 min-w-[120px] text-center py-2 px-4 rounded-md capitalize transition-all cursor-pointer font-medium
				${
					active
						? 'bg-[#0d6efd] text-white shadow-md'
						: isDark
							? 'bg-[#343a40] text-[#f8f9fa] hover:bg-[#495057]'
							: 'bg-white text-[#212529] border border-gray-300 hover:bg-gray-100'
				}`}
						>
							{label}
						</button>
					))}
				</div>

				{loading && (
					<div className='flex justify-center items-center mt-6'>
						<div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
					</div>
				)}
				{error && (
					<p className='mt-4 text-red-500 text-center text-3xl font-bold'>Error: {error}</p>
				)}

				{!loading && activeTab(AVAILABLE_TABS.current) && (
					<WeatherDisplay data={{ ...current, unit }} displayOptions={displayOptions} />
				)}
				{!loading && activeTab(AVAILABLE_TABS.forecast) && (
					<ForecastList data={{ forecast, unit }} />
				)}
			</div>

			<SettingsPanel
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
				settings={settings}
				dispatch={dispatchSettings}
				setRefreshRate={setRefreshRate}
			/>
		</div>
	);
};
