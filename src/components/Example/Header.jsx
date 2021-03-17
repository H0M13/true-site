import React, { useState } from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl'
import { getUsername, setUsername } from '../../utils/duck'
import { types, defaultProps } from './HeaderTypes.js'

import styles from './Header.scss';


const Header = ({
	intl: {
		messages: {
			projectTitle
		}
	},
	username,
	setUsername
}) => {
	setUsername("Samalot Test 2");

  return (
		<div className={styles.headerContainer}>
			<div>
				{ projectTitle }
			</div>
		</div>
	);
}

Header.propTypes = types;
Header.defaultProps = defaultProps;

const mapDispatchToProps = {
	setUsername,
};

const mapStateToProps = createStructuredSelector({
	username: getUsername,
});

const hocChain = compose(
	injectIntl,
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(Header);
