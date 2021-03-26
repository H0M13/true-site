import React from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import { getLocalProvider } from "../../utils/duck";
import { Gallery } from "../../components"

const GalleryView = ({ localProvider }) => {

  return (
    <Gallery 
    provider={localProvider}
	/>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({
  localProvider: getLocalProvider
});

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));

export default hocChain(GalleryView);
