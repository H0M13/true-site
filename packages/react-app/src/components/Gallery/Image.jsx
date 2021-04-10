import React, { Fragment } from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import { Image, Progress, Spin } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ReactComponent as TrueSightLogo } from "../linkward.svg";

import "./gallery.scss";

const ipfsGatewayUrl = "https://gateway.ipfs.io/ipfs/";

const PlaceHolder = () => (
	<div className="galleryImageContainer">
		<div className="imageContainer imagePlaceholder">
			<div className="imagePlaceholderGrowTop" />
			<Spin size="large" />
			<p className="imagePlaceholderLabel">Generating Labels</p>
			<div className="imagePlaceholderGrowBottom" />
			<p className="imagePlaceholderFooter">Will automatically update once complete</p>
		</div>
	</div>
);

const GalleryImage = ({ image: {
	imageHash,
	moderationLabels,
	hasModerationLabels
} }) => {
	const imageHashUrl = `${ipfsGatewayUrl}${imageHash}`;
	const explicit = moderationLabels && moderationLabels.length > 0;

	if (!hasModerationLabels) {
		return (<PlaceHolder />)
	}

	return (
		<div className="galleryImageContainer">
			{hasModerationLabels && (
				<div className="imageContainer">
					{explicit && (
						<Fragment>
							<div className="warningLabel">
								<ExclamationCircleOutlined style={{ marginRight: "5px" }} /> Content Flagged
              </div>

							<div className="labelContainer">
								{moderationLabels.map((label, index) => (
									<div key={`imageModerationLabel-${imageHash}-${index}`} className="moderationLabel">
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
