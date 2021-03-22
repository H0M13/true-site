import React from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import { getInjectedProvider, getLocalProvider, getTargetNetwork } from "../../utils/duck";
import { useUserProvider } from "../../hooks";
import { Gallery } from "../../components"

const GalleryView = ({ localProvider, injectedProvider, targetNetwork }) => {
  const userProvider = useUserProvider(injectedProvider, localProvider);

  return (
    <Gallery 
		provider={localProvider}
	/>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({
  localProvider: getLocalProvider,
  injectedProvider: getInjectedProvider,
  targetNetwork: getTargetNetwork,
});

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));

export default hocChain(GalleryView);
