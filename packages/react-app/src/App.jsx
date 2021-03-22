import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "antd/dist/antd.css";
import {  Web3Provider } from "@ethersproject/providers";
import "./App.css";
import { Row, Col, Button, Alert } from "antd";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useUserAddress } from "eth-hooks";
import { useExchangePrice, useGasPrice, useUserProvider, useBalance } from "./hooks";
import { Header, Account, Faucet, Ramp, GasGauge, ThemeSwitch } from "./components";
import Transactor from "./utils/Transactor";
import { formatEther, parseEther } from "@ethersproject/units";

import { IntlProvider } from 'react-intl'
import { getLabels, validLocale } from './utils/labels'
import { parse as UrlParse } from 'query-string'
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { getLocale, setLocale, getLocalProvider, setInjectedProvider, getTargetNetwork, getMainnetProvider } from './utils/duck'

import { INFURA_ID, NETWORK, NETWORKS } from "./utils/constants";

import Menu from './views/Menu/Menu.jsx'
import Routes from './views/Routes'

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

  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangePrice(targetNetwork,mainnetProvider);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork,"fast");
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);

  // You can warn the user if you would like them to be on a specific network
  let localChainId = localProvider && localProvider._network && localProvider._network.chainId

  let selectedChainId = userProvider && userProvider._network && userProvider._network.chainId
  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks


  // Faucet Tx can be used to send funds from the faucet
  const faucetTx = Transactor(localProvider, gasPrice)

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address);


  let networkDisplay = ""
  if(localChainId && selectedChainId && localChainId != selectedChainId ){
    networkDisplay = (
      <div style={{zIndex:2, position:'absolute', right:0,top:60,padding:16}}>
        <Alert
          message={"⚠️ Wrong Network"}
          description={(
            <div>
              You have <b>{NETWORK(selectedChainId).name}</b> selected and you need to be on <b>{NETWORK(localChainId).name}</b>.
            </div>
          )}
          type="error"
          closable={false}
        />
      </div>
    )
  }else{
    networkDisplay = (
      <div style={{zIndex:-1, position:'absolute', right:154,top:28,padding:16,color:targetNetwork.color}}>
        {targetNetwork.name}
      </div>
    )
  }

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  let faucetHint = ""
  const faucetAvailable = localProvider && localProvider.connection && localProvider.connection.url && localProvider.connection.url.indexOf(window.location.hostname)>=0 && !process.env.REACT_APP_PROVIDER && price > 1;

  const [ faucetClicked, setFaucetClicked ] = useState( false );
  if(!faucetClicked&&localProvider&&localProvider._network&&localProvider._network.chainId==31337&&yourLocalBalance&&formatEther(yourLocalBalance)<=0){
    faucetHint = (
      <div style={{padding:16}}>
        <Button type={"primary"} onClick={()=>{
          faucetTx({
            to: address,
            value: parseEther("0.01"),
          });
          setFaucetClicked(true)
        }}>
          💰 Grab funds from the faucet ⛽️
        </Button>
      </div>
    )
  }

	let location = useLocation();
	useEffect(() => {
		const params = UrlParse(location.search);
		validLocale(params.locale) && setLocale(params.locale);
	}, []);

  return (

		<IntlProvider messages={getLabels(locale)} locale={locale} defaultLocale="en-GB">
			<div className="App">
				<Header />
				{networkDisplay}
				<Menu/>
				<Routes />
				<ThemeSwitch />

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
					{faucetHint}
				</div>

				{/* 🗺 Extra UI like gas price, eth price, faucet, and support: */}
				<div style={{ position: "fixed", textAlign: "left", left: 0, bottom: 20, padding: 10 }}>
					<Row align="middle" gutter={[4, 4]}>
						<Col span={8}>
							<Ramp price={price} address={address} networks={NETWORKS}/>
						</Col>

						<Col span={8} style={{ textAlign: "center", opacity: 0.8 }}>
							<GasGauge gasPrice={gasPrice} />
						</Col>
						<Col span={8} style={{ textAlign: "center", opacity: 1 }}>
							<Button
								onClick={() => {
									window.open("https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA");
								}}
								size="large"
								shape="round"
							>
								<span style={{ marginRight: 8 }} role="img" aria-label="support">
									💬
								</span>
								Support
							</Button>
						</Col>
					</Row>

					<Row align="middle" gutter={[4, 4]}>
						<Col span={24}>
							{

								/*  if the local provider has a signer, let's show the faucet:  */
								faucetAvailable ? (
									<Faucet localProvider={localProvider} price={price} ensProvider={mainnetProvider}/>
								) : (
									""
								)
							}
						</Col>
					</Row>
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
