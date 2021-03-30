import React from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import { PageHeader } from "antd";
import { ReactComponent as TrueSightLogo } from "./linkward.svg";

import "./Header.scss";

const Header = ({}) => {
  return (
    <PageHeader
      title="🛡️ TrueSite"
      subTitle={
        <span className="header-subtitle">
          ...a confusingly-named demo of{" "}
          <a href="https://truesight.link" className="header-link">
            <TrueSightLogo className="header-truesight-icon" />
            <span>TrueSight</span>
          </a>
        </span>
      }
    />
  );
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({});

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));

export default hocChain(Header);
