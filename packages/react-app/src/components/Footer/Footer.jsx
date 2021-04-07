import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { GithubOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import address from '../../contracts/YourContract.address'
import { ReactComponent as PolygonLogo } from "../polygon-matic-logo.svg";

import './Footer.scss'

const Footer = () => {
	const { state } = useLocation();

	return (
		<div className="footerContainer">
			Made with <span role="img" aria-label="purple heart emoji">💜</span> for the <a target="_blank" href="https://chainlink-2021.devpost.com/">Spring 2021 ChainLink Hackathon</a>{" "}
			- <a target="_blank" href="https://github.com/H0M13/TrueSight-explainer"><GithubOutlined /> GitHub</a>
			{" "} - <a target="_blank" href={`https://explorer-mumbai.maticvigil.com/address/${address}/transactions`}><PolygonLogo className="polygonLogo" /> Mumbai Testnet</a>
		</div >
	);
}

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	connect(mapStateToProps, mapDispatchToProps)
);

export default hocChain(Footer);