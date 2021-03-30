import React from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import { Image } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import "./gallery.scss";

const ipfsGatewayUrl = "https://gateway.ipfs.io/ipfs/";

const GalleryImage = ({ image }) => {
  const imageHashUrl = `${ipfsGatewayUrl}${image.imageHash}`;

  const explicit = image.moderationLabels && image.moderationLabels.length > 0;

  return (
    <div className="galleryImageContainer">
      {image.hasModerationLabels && (
        <div className="imageContainer">
          {explicit && (
            <div className="warningLabel">
              <ExclamationCircleOutlined style={{ marginRight: "5px" }} /> Content Flagged
            </div>
          )}

          <div className={explicit ? "blurImage" : ""}>
            <Image height={200} src={imageHashUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({});

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));

export default hocChain(GalleryImage);
