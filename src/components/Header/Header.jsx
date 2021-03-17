import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl'
import { getUsername } from '../../utils/duck'
import { types, defaultProps } from './HeaderTypes.js'

import styles from './Header.scss';


const Header = ({
	intl: {
		messages: {
			projectTitle
		}
	},
	username,
}) => {
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

const mapStateToProps = createStructuredSelector({
	username: getUsername,
});

const hocChain = compose(
	injectIntl,
	connect(mapStateToProps),
);

export default hocChain(Header);
