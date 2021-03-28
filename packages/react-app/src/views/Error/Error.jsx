import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { WarningOutlined, FrownOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';


const ErrorView = ({
}) => {
	const { state } = useLocation();

  return (
		<div>
			<WarningOutlined style={{ fontSize: '42px', color: '#7f0000', 'marginBottom': '5px'}} />
			<div>Oh no! Something went wrong <FrownOutlined /></div>
			{state && state.message && <div> { state.message } </div>}
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

export default hocChain(ErrorView);