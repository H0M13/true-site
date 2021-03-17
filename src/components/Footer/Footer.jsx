import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { types, defaultProps } from './FooterTypes.js'

import styles from './Footer.scss';


const Footer = () => {
  return (
		<div className={styles.FooterContainer}>
			<div>Footer</div>
		</div>
	);
}

Footer.propTypes = types;
Footer.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	connect(mapStateToProps),
);

export default hocChain(Footer);
