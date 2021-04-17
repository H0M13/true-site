import React, { Fragment } from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import { ReactComponent as TrueSightLogo } from "../linkward.svg";
import { StarFilled } from '@ant-design/icons';

import "./Header.scss";

const Header = () => {
	return (
		<Fragment>
			<div className="titleContainer">
				<TrueSightLogo className="header-truesight-icon" />
				<div className="title">TrueSite</div>
				<div className="subtitle">a confusingly-named demo of </div>
				<div className="titleLink"><a target="_blank" rel="noopener noreferrer" href="https://github.com/H0M13/TrueSight-explainer">TrueSight</a></div>
				<div className="badge"><StarFilled /> Hackathon Runner Up</div>
			</div>
		</Fragment>
	);
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({});

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));

export default hocChain(Header);
