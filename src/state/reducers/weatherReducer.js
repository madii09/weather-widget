import {
	CHANGE_CITY,
	CLEAR_ERROR,
	FETCH_WEATHER,
	SET_ERROR,
	SET_REFRESH_RATE,
	START_FETCH,
	TOGGLE_UNIT,
} from '../actions';

export const initialState = {
	city: 'London',
	unit: 'metric',
	current: null,
	forecast: null,
	error: null,
	loading: false,
	refreshRate: null,
};

export const weatherReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_FETCH:
			return { ...state, loading: true, error: null };

		case FETCH_WEATHER:
			return {
				...state,
				current: action.payload.current,
				forecast: action.payload.forecast,
				loading: false,
				error: null,
			};

		case CHANGE_CITY:
			return { ...state, city: action.payload };

		case TOGGLE_UNIT:
			return {
				...state,
				unit: state.unit === 'metric' ? 'imperial' : 'metric',
			};

		case SET_ERROR:
			return { ...state, error: action.payload, loading: false };

		case CLEAR_ERROR:
			return { ...state, error: null };

		case SET_REFRESH_RATE:
			return {
				...state,
				refreshRate: action.payload,
			};

		default:
			return state;
	}
};
