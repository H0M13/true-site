import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl'
import { types, defaultProps } from './ExampleTypes.js'

import styles from './Example.scss';

const Example = ({
	intl
}) => {
  return (
		<div>
			Example
		</div>
	);
}

Example.propTypes = types;
Example.defaultProps = defaultProps;

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	injectIntl,
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(Example);

