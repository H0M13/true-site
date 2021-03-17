import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl'
import { } from '../../utils/duck'
import { types, defaultProps } from './ErrorTypes.js'

import styles from './Error.scss';

const Error = ({
	intl
}) => {
  return (
		<div>
			Error
		</div>
	);
}

Error.propTypes = types;
Error.defaultProps = defaultProps;

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	injectIntl,
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(Error);