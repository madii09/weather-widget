import { useEffect, useReducer } from 'react';
import { defaultSettings, settingsReducer } from '../../state/reducers/settingsReducer';
import { SETTINGS_LOCAL_STORAGE_KEY } from '../../utils';

export const useSettings = () => {
	const [state, dispatch] = useReducer(settingsReducer, defaultSettings, () => {
		const saved = localStorage.getItem(SETTINGS_LOCAL_STORAGE_KEY);
		return saved ? JSON.parse(saved) : defaultSettings;
	});

	useEffect(() => {
		localStorage.setItem(SETTINGS_LOCAL_STORAGE_KEY, JSON.stringify(state));
	}, [state]);

	return [state, dispatch];
};
