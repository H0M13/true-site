import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { Image } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './gallery.scss'


const ipfsGatewayUrl = "https://gateway.ipfs.io/ipfs/";

const GalleryImage = ({
	image
}) => {
	const imageHashUrl = `${ipfsGatewayUrl}${image.imageHash}`;

	const explict = image.moderationLabels && image.moderationLabels.length > 0;

  return (
		<div className="galleryImageContainer">
			{image.hasModerationLabels && (
				<div className="imageContainer">
					{/* <img style={{ maxWidth: "300px", height: "280px" }} src={imageHashUrl} /> */}
					{/* <span>
						Moderation labels: <a href={moderationLabelsUrl}>{moderationLabelsUrl}</a>
					</span> */}
					{
						explict && (
							<div className="warningLabel">
							<ExclamationCircleOutlined style={{ 'marginRight': '5px'}} /> Content Flagged
							</div>
						)
					}

					<div className={explict && "blurImage"}>
						<Image
							height={200}
							src={imageHashUrl}
						/>
					</div>

				</div>
			)}
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

export default hocChain(GalleryImage);
