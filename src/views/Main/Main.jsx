import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl'
import { } from '../../utils/duck'
import { types, defaultProps } from './MainTypes.js'

import styles from './Main.scss';

const Main = ({
	intl
}) => {
  return (
		<div>
			Main
		</div>
	);
}

Main.propTypes = types;
Main.defaultProps = defaultProps;

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	injectIntl,
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(Main);