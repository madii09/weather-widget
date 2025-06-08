import {
	RESET,
	SET_AUTO_REFRESH_RATE,
	SET_UNIT_LOCKED,
	TOGGLE_DESCRIPTION,
	TOGGLE_WIND,
} from '../actions';

export const defaultSettings = {
	refreshRate: 15,
	isUnitLocked: true,
	displayOptions: {
		showWind: true,
		showDescription: true,
	},
};

export const settingsReducer = (state, action) => {
	switch (action.type) {
		case SET_AUTO_REFRESH_RATE:
			return { ...state, refreshRate: action.payload };
		case SET_UNIT_LOCKED:
			return { ...state, isUnitLocked: action.payload };
		case TOGGLE_WIND:
			return {
				...state,
				displayOptions: {
					...state.displayOptions,
					showWind: !state.displayOptions.showWind,
				},
			};
		case TOGGLE_DESCRIPTION:
			return {
				...state,
				displayOptions: {
					...state.displayOptions,
					showDescription: !state.displayOptions.showDescription,
				},
			};
		case RESET:
			return defaultSettings;
		default:
			return state;
	}
};
