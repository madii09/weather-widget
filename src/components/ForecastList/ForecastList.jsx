import { getUnitLabel } from '../../utils';
import { ThemeContext } from '../../App';
import { useContext } from 'react';

export const ForecastList = ({ data }) => {
	const { isDark } = useContext(ThemeContext);

	return (
		<div className='mt-8'>
			<h3 className='text-2xl font-semibold my-4 text-center bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent'>
				6-Day Forecast
			</h3>
			<div className='flex gap-4 flex-wrap'>
				{data.forecast.map(({ temp, description, time, icon }, index) => {
					return (
						<div
							key={index}
							className={`p-4 rounded-2xl w-30 text-center transition-colors duration-300 
		${
			isDark
				? 'bg-[#343a40] text-[#f8f9fa] hover:bg-[#495057]'
				: 'bg-white text-[#212529] hover:bg-white/20'
		}`}
						>
							<div className='text-md font-medium'>{time}</div>

							<img src={icon} alt={description} className='mx-auto w-10 h-10 my-1' />

							<div className='text-lg font-bold bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent'>
								{temp}
								{getUnitLabel(data.unit)}
							</div>

							<div className='text-xs'>{description}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
