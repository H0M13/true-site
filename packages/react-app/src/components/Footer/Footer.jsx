import React from "react";
import { GithubOutlined } from '@ant-design/icons';
import address from '../../contracts/YourContract.address'
import { ReactComponent as PolygonLogo } from "../polygon-matic-logo.svg";

import './Footer.scss'

const Footer = () => (
	<div className="footerContainer">
		Made with <span role="img" aria-label="purple heart emoji">💜</span> for the <a target="_blank" rel="noopener noreferrer" href="https://chainlink-2021.devpost.com/">Spring 2021 ChainLink Hackathon</a>{" "}
		- <a target="_blank" rel="noopener noreferrer" href="https://github.com/H0M13/TrueSight-explainer"><GithubOutlined /> GitHub</a>
		{" "} - <a target="_blank" rel="noopener noreferrer" href={`https://explorer-mumbai.maticvigil.com/address/${address}/transactions`}><PolygonLogo className="polygonLogo" /> Mumbai Testnet</a>
	</div >
);

export default Footer;