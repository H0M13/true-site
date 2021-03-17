import { Map } from 'immutable'


//========================== STATE
const initialState = Map({
	locale: 'en-GB',
	username: 'test',
});


//========================== ENUMS
export const SET_LOCALE = 'SET_LOCALE';
export const SET_USERNAME = 'SET_USERNAME';


//========================== GETTERS
export const getLocale = state => state.get('locale');
export const getUsername = state => state.get('username');


//========================== SETTERS
export const setLocale = newLocale => dispatch => dispatch({
	type: SET_LOCALE,
	newLocale,
});

export const setUsername = newUsername => dispatch => dispatch({
	type: SET_USERNAME,
	newUsername,
});


//========================== REDUCER
export let reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOCALE:
			return 	state.set('locale', action.newLocale);

		case SET_USERNAME:
			return 	state.set('username', action.newUsername);

		default:
			return state;
	}
}