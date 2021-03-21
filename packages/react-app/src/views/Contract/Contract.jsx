import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { getInjectedProvider, getLocalProvider, getTargetNetwork } from '../../utils/duck'
// import { types, defaultProps } from './About.js'
import { Contract } from "../../components";
import { useUserProvider } from "../../hooks";
import { useUserAddress } from "eth-hooks";

// import styles from './About.scss';

const ContractView = ({
	localProvider,
	injectedProvider,
	targetNetwork
}) => {
	const userProvider = useUserProvider(injectedProvider, localProvider);
	const address = useUserAddress(userProvider);
	const blockExplorer = targetNetwork.blockExplorer;

  return (
		<Contract
			name="YourContract"
			signer={userProvider.getSigner()}
			provider={localProvider}
			address={address}
			blockExplorer={blockExplorer}
		/>
	);
}

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
	localProvider: getLocalProvider,
	injectedProvider: getInjectedProvider,
	targetNetwork: getTargetNetwork
});

const hocChain = compose(
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(ContractView);