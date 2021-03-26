import { Map } from 'immutable'
import { JsonRpcProvider } from "@ethersproject/providers";
import { NETWORKS, INFURA_ID } from "./constants";

const network = 'mumbai';

const scaffoldEthProvider = new JsonRpcProvider("https://rpc.scaffoldeth.io:48544")
const mainnetInfura = new JsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID)
const mainnetProvider = (scaffoldEthProvider && scaffoldEthProvider._network) ? scaffoldEthProvider : mainnetInfura

const localProviderUrl = NETWORKS[network].rpcUrl;
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl; 

//========================== STATE
const initialState = Map({
	locale: 'en-GB',
	username: 'test',
	localProvider: new JsonRpcProvider(localProviderUrlFromEnv),
	injectedProvider: null,
	targetNetwork: NETWORKS[network],
	mainnetProvider: mainnetProvider
});


//========================== ENUMS
export const SET_LOCALE = 'SET_LOCALE';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_INJECTED_PROVIDER = 'SET_INJECTED_PROVIDER';


//========================== GETTERS
export const getLocale = state => state.get('locale');
export const getUsername = state => state.get('username');
export const getLocalProvider = state => state.get('localProvider');
export const getInjectedProvider = state => state.get('injectedProvider');
export const getMainnetProvider = state => state.get('mainnetProvider');
export const getTargetNetwork = state => state.get('targetNetwork');


//========================== SETTERS
export const setLocale = newLocale => dispatch => dispatch({
	type: SET_LOCALE,
	newLocale,
});

export const setUsername = newUsername => dispatch => dispatch({
	type: SET_USERNAME,
	newUsername,
});

export const setInjectedProvider = newProvider => dispatch => dispatch({
	type: SET_INJECTED_PROVIDER,
	newProvider,
});


//========================== REDUCER
export let reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LOCALE:
			return 	state.set('locale', action.newLocale);

		case SET_USERNAME:
			return 	state.set('username', action.newUsername);

		case SET_INJECTED_PROVIDER:
			return 	state.set('injectedProvider', action.newProvider);

		default:
			return state;
	}
}