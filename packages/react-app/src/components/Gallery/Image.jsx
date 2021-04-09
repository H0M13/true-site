import React, { Fragment } from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import { Image, Progress } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ReactComponent as TrueSightLogo } from "../linkward.svg";

import "./gallery.scss";

const ipfsGatewayUrl = "https://gateway.ipfs.io/ipfs/";

const GalleryImage = ({ image }) => {
  const imageHashUrl = `${ipfsGatewayUrl}${image.imageHash}`;

  const explicit = image.moderationLabels && image.moderationLabels.length > 0;

  if (explicit) {
    console.info(image.moderationLabels);
  }

  return (
    <div className="galleryImageContainer">
      {image.hasModerationLabels && (
        <div className="imageContainer">
          {explicit && (
            <Fragment>
              <div className="warningLabel">
                <ExclamationCircleOutlined style={{ marginRight: "5px" }} /> Content Flagged
              </div>

              <div className="labelContainer">
                {image.moderationLabels.map((label, index) => (
                  <div key={`imageModerationLabel-${image.imageHash}-${index}`} className="moderationLabel">
                    <div className="labelTitle">{label.Name}</div>
                    <Progress type="circle" percent={Math.round(label.Confidence)} width={30} />
                  </div>
                ))}
              </div>
            </Fragment>
          )}

          {!explicit && <TrueSightLogo className="image-green-truesight-icon" />}

          <div className={explicit ? "blurImage" : ""}>
            <Image height={200} src={imageHashUrl} placeholder={true} />
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
