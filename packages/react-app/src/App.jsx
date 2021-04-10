import React, { Fragment, useCallback, useEffect } from "react";
import "antd/dist/antd.css";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useUserAddress } from "eth-hooks";
import { useExchangePrice, useUserProvider } from "./hooks";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { getLocale, setLocale, getLocalProvider, setInjectedProvider, getTargetNetwork, getMainnetProvider } from './utils/duck'
import { INFURA_ID } from "./utils/constants";
import Account from './components/Account.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Menu from './views/Menu.jsx'
import Routes from './views/Routes'

import "./App.scss";

const App = ({
	targetNetwork,
	injectedProvider,
	setInjectedProvider,
	localProvider,
	mainnetProvider
}) => {
	const blockExplorer = targetNetwork.blockExplorer;
	const price = useExchangePrice(targetNetwork, mainnetProvider);
	const userProvider = useUserProvider(injectedProvider, localProvider);
	const address = useUserAddress(userProvider);

	const loadWeb3Modal = useCallback(async () => {
		const provider = await web3Modal.connect();
		setInjectedProvider(new Web3Provider(provider));
	}, [setInjectedProvider]);

	useEffect(() => {
		if (web3Modal.cachedProvider) {
			loadWeb3Modal();
		}
	}, [loadWeb3Modal]);

	return (
		<Fragment>
			<div className="App">
				<Header />
				<Menu />

				<div className="content">
					<Routes />
				</div>

				<div style={{ position: "fixed", textAlign: "right", right: '20px', top: '20px' }}>
					<Account
						address={address}
						localProvider={localProvider}
						userProvider={userProvider}
						mainnetProvider={mainnetProvider}
						price={price}
						web3Modal={web3Modal}
						loadWeb3Modal={loadWeb3Modal}
						logoutOfWeb3Modal={logoutOfWeb3Modal}
						blockExplorer={blockExplorer}
					/>
				</div>

				<Footer />

				<div className="waveTopBox"></div>
				<svg className="waveTop">
					<path className="wavePath" fillOpacity="0.7" d="M 0 64 L 48 58.7 C 96 53 192 43 288 42.7 C 384 43 480 53 576 64 C 672 75 768 85 864 85.3 C 960 85 1056 75 1152 64 C 1248 53 1362 26 2856 14 L 3440 32 L 3441 194 L -1 186 Z" />
				</svg>

				<svg className="waveBottom">
					<path className="wavePath" fillOpacity="0.7" d="M0,64L48,58.7C96,53,192,43,288,42.7C384,43,480,53,576,64C672,75,768,85,864,85.3C960,85,1056,75,1152,64C1248,53,1344,43,2892,37.3L3440,32L3440,320L1392,320C3344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
				</svg>
			</div>

			<svg className="waveGradient" aria-hidden="true" focusable="false">
				<linearGradient id="waveGradient1" x2="1" y2="1">
					<stop offset="0%" stopColor="#447799" />
					<stop offset="50%" stopColor="#224488" />
					<stop offset="100%" stopColor="#112266" />
				</linearGradient>
			</svg>
		</Fragment>
	);
}

const web3Modal = new Web3Modal({
	cacheProvider: true,
	providerOptions: {
		walletconnect: {
			package: WalletConnectProvider,
			options: {
				infuraId: INFURA_ID,
			},
		},
	},
});

const logoutOfWeb3Modal = async () => {
	await web3Modal.clearCachedProvider();
	setTimeout(() => {
		window.location.reload();
	}, 1);
};

window.ethereum && window.ethereum.on('chainChanged', chainId => {
	setTimeout(() => {
		window.location.reload();
	}, 1);
})

const mapDispatchToProps = {
	setLocale,
	setInjectedProvider
};

const mapStateToProps = createStructuredSelector({
	locale: getLocale,
	localProvider: getLocalProvider,
	targetNetwork: getTargetNetwork,
	mainnetProvider: getMainnetProvider,
});

const hocChain = compose(
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(App);
