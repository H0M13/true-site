import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import './Spinner.scss'

const Spinner = ({
	intl: {
    messages: {
      loading: {
				label,
				messages
			}
    },
  },
}) => {
  return (
		<div>
			<svg
				preserveAspectRatio="xMidYMid meet"
				version="1.1"
				viewBox="-50 -50 100 100"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					class="example3-rect"
					x="-8"
					y="-8"
					height="16"
					width="16"
				/>
				<rect
					class="example3-rect"
					x="-16"
					y="-16"
					height="32"
					width="32"
				/>
				<rect
					class="example3-rect"
					x="-24"
					y="-24"
					height="48"
					width="48"
				/>
			</svg>

			<div>{ label }</div>
			<div>{ `(${messages[Math.floor(Math.random() * messages.length)]})` }</div>
		</div>
	);
}

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	injectIntl,
	connect(mapStateToProps, mapDispatchToProps)
);

export default hocChain(Spinner);
