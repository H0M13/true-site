import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { Image } from 'antd';

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
				<div>
					{/* <img style={{ maxWidth: "300px", height: "280px" }} src={imageHashUrl} /> */}
					{/* <span>
						Moderation labels: <a href={moderationLabelsUrl}>{moderationLabelsUrl}</a>
					</span> */}

					<div className={explict && "blurImage"}>
						<Image
							height={250}
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
