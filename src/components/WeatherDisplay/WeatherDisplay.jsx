import { getUnitLabel } from '../../utils';

export const WeatherDisplay = ({ data, displayOptions }) => {
	return (
		<div className='flex flex-col items-center justify-center space-y-2'>
			<div className='text-center py-6'>
				<h2 className='text-4xl font-bold bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent'>
					{data.city}
				</h2>
				<p className='text-md'>{data.updatedAt}</p>
			</div>
			<img src={data.icon} alt={data.description} className='w-32 h-32' loading='lazy' />
			<div className='flex items-center space-x-3'>
				<p className='text-6xl font-extrabold bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent'>
					{data.temp}
					{getUnitLabel(data.unit)}
				</p>
			</div>
			{displayOptions?.showDescription && (
				<p className='py-4 capitalize text-xl'>{data.description}</p>
			)}

			{displayOptions?.showHumidity && <p className='text-md'>💧 Humidity: {data.humidity}%</p>}
		</div>
	);
};
