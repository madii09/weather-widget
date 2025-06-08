import { useContext } from 'react';
import { ThemeContext } from '../../App';
import {
	SET_AUTO_REFRESH_RATE,
	SET_UNIT_LOCKED,
	TOGGLE_DESCRIPTION,
	TOGGLE_WIND,
} from '../../state';

export const SettingsPanel = ({ isOpen, onClose, settings, dispatch, setRefreshRate }) => {
	const { refreshRate, isUnitLocked, displayOptions } = settings;
	const { isDark } = useContext(ThemeContext);

	const bgColor = isDark ? 'bg-[#212529]' : 'bg-[#f8f9fa]';
	const textColor = isDark ? 'text-[#f8f9fa]' : 'text-[#212529]';
	const borderColor = isDark ? 'border-[#495057]' : 'border-gray-300';
	const inputBg = isDark ? 'bg-[#343a40]' : 'bg-white';

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
			<div
				className={`${bgColor} ${textColor} w-full max-w-md rounded-xl shadow-lg p-6 transition-all`}
			>
				<h2 className='text-xl font-bold mb-4 text-center'>⚙️ Settings</h2>

				<div className='mb-4'>
					<label className='block mb-1 font-medium'>Auto Refresh Rate (minutes)</label>
					<input
						type='number'
						min='1'
						defaultValue={refreshRate}
						onChange={e => {
							const rate = Number(e.target.value);
							dispatch({ type: SET_AUTO_REFRESH_RATE, payload: rate });
							if (rate > 0) {
								setRefreshRate(rate);
							}
						}}
						className={`w-full px-3 py-2 rounded-md border ${borderColor} ${inputBg} ${textColor}`}
					/>
				</div>

				<div className='mb-4'>
					<label className='flex items-center gap-2 cursor-pointer select-none'>
						<input
							type='checkbox'
							checked={isUnitLocked}
							onChange={e => dispatch({ type: SET_UNIT_LOCKED, payload: e.target.checked })}
						/>
						<span className='font-medium'>Lock Units from Main UI</span>
					</label>
				</div>

				<div className='mb-4'>
					<label className='block mb-1 font-medium'>Display Options</label>

					<label className='flex items-center gap-2'>
						<input
							type='checkbox'
							checked={displayOptions.showHumidity}
							onChange={() => dispatch({ type: TOGGLE_WIND })}
						/>
						Show Wind
					</label>

					<label className='flex items-center gap-2 mt-2'>
						<input
							type='checkbox'
							checked={displayOptions.showDescription}
							onChange={() => dispatch({ type: TOGGLE_DESCRIPTION })}
						/>
						Show Description
					</label>
				</div>

				<div className='flex justify-end gap-2 mt-6'>
					<button
						onClick={onClose}
						className='px-4 py-2 bg-[#0d6efd] hover:opacity-90 rounded-md text-white text-sm font-medium'
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};
