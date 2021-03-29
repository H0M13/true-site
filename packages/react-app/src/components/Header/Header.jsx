import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { PageHeader } from "antd";
import { injectIntl } from 'react-intl'

import './Header.scss'

const Header = ({
}) => {
  return (
		<PageHeader
			title="🛡️ TrueSite"
			subTitle="A confusingly-named demo of TrueSight"
		/>
	);
}

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(Header);
