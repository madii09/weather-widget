import { useContext, useMemo, useState } from 'react';
import { ThemeContext } from '../../App';
import { CITIES } from '../../utils';

export const CitySelector = ({ currentCity, onSelectCity }) => {
	const { isDark } = useContext(ThemeContext);

	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const filteredCities = useMemo(() => {
		return CITIES.filter(city => city.toLowerCase().includes(query.toLowerCase()));
	}, [query]);

	return (
		<div className='relative w-full max-w-xs sm:max-w-sm md:max-w-md mb-6 ml-auto'>
			<button
				onClick={() => setIsOpen(prev => !prev)}
				className={`w-full px-4 py-3 text-md text-left rounded-lg border shadow-sm transition-colors
				${
					isDark
						? 'bg-[#343a40] text-[#f8f9fa] border-[#495057] hover:bg-[#495057]'
						: 'bg-white text-[#212529] border-gray-300 hover:bg-gray-100'
				}`}
			>
				{currentCity || 'Choose a city'}
			</button>

			{isOpen && (
				<div
					className={`absolute z-10 w-full mt-2 rounded-lg shadow-lg border transition-colors
      ${isDark ? 'bg-[#343a40] text-[#f8f9fa] border-[#495057]' : 'bg-white text-[#212529] border-gray-300'}`}
				>
					<div className='flex justify-center px-3 py-2 rounded-t-lg'>
						<input
							type='text'
							value={query}
							onChange={e => setQuery(e.target.value)}
							className={`w-full max-w-xs text-sm sm:text-md outline-none rounded-lg
          ${
						isDark
							? 'bg-[#212529] text-[#f8f9fa] placeholder-gray-400'
							: 'bg-gray-100 text-[#212529] placeholder-gray-500'
					}`}
							placeholder='Search city...'
						/>
					</div>

					<ul className='max-h-48 overflow-y-auto rounded-b-lg'>
						{filteredCities.length > 0 ? (
							filteredCities.map(city => (
								<li
									key={city}
									onClick={() => {
										if (city !== currentCity) {
											onSelectCity(city);
										}
										setIsOpen(false);
										setQuery('');
									}}
									className={`px-4 py-2 text-sm sm:text-md cursor-pointer transition-colors 
            ${
							city === currentCity
								? 'bg-[#0d6efd] text-white font-semibold'
								: isDark
									? 'hover:bg-[#495057]'
									: 'hover:bg-gray-100'
						}`}
								>
									{city}
								</li>
							))
						) : (
							<li className='px-4 py-2 text-sm text-gray-400'>No results</li>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};
