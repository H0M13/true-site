import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";

import messages from "../../labels/loadingMessages.json"

import './Spinner.scss'

const Spinner = () => {
	return (
		<div>
			<svg
				className="spinnerSVG"
				version="1.1"
				viewBox="-50 -50 100 100"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					className="example3-rect"
					x="-8"
					y="-8"
					height="16"
					width="16"
				/>
				<rect
					className="example3-rect"
					x="-16"
					y="-16"
					height="32"
					width="32"
				/>
				<rect
					className="example3-rect"
					x="-24"
					y="-24"
					height="48"
					width="48"
				/>
			</svg>

			<div className="spinnerLabel">Loading</div>
			<div className="spinnerMessage">{`${messages[Math.floor(Math.random() * messages.length)]}`}</div>
		</div>
	);
}

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	connect(mapStateToProps, mapDispatchToProps)
);

export default hocChain(Spinner);
