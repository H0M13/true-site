import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { PageHeader } from "antd";
import { injectIntl } from 'react-intl'

const Header = ({
	intl: {
		messages: {
			projectTitle,
			projectSubTitle,
		}
	},
}) => {
  return (
		<PageHeader
			title={projectTitle}
			subTitle={projectSubTitle}
		/>
	);
}

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	injectIntl,
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(Header);