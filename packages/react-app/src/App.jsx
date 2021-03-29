import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "antd/dist/antd.css";
import {  Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useUserAddress } from "eth-hooks";
import { useExchangePrice, useUserProvider } from "./hooks";
import { IntlProvider } from 'react-intl'
import { getLabels, validLocale } from './utils/labels'
import { parse as UrlParse } from 'query-string'
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { getLocale, setLocale, getLocalProvider, setInjectedProvider, getTargetNetwork, getMainnetProvider } from './utils/duck'
import { INFURA_ID } from "./utils/constants";
import Account from './components/Account.jsx'
import Header from './components/Header/Header.jsx'
import Menu from './views/Menu/Menu.jsx'
import Routes from './views/Routes'

import "./App.scss";

const App = ({
	targetNetwork,
	locale,
	setLocale,
	injectedProvider,
	setInjectedProvider,
	localProvider,
	mainnetProvider
}) => {
	const blockExplorer = targetNetwork.blockExplorer;
  const price = useExchangePrice(targetNetwork,mainnetProvider);
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


	let location = useLocation();

	useEffect(() => {
		const params = UrlParse(location.search);
		validLocale(params.locale) && setLocale(params.locale);
	}, []);

  return (

		<IntlProvider messages={getLabels(locale)} locale={locale} defaultLocale="en-GB">
			<div className="App">
				<Header />
				<Menu/>
				
				<div className="content">
					<Routes />
				</div>

				{/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
				<div style={{ position: "fixed", textAlign: "right", right: 0, top: 0, padding: 10 }}>
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

			</div>
		</IntlProvider>
  );
}


/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
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
