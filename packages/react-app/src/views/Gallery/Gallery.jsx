import React, { useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import { getLocalProvider } from "../../utils/duck";
import { ethers } from "ethers";
import { useContractLoader } from "../../hooks";
import GalleryPages from "../../components/Gallery/GalleryPages";
import axios from "axios";
import bs58 from "bs58";
import Spinner from "../../components/Spinner/Spinner.jsx";

const ipfsGatewayUrl = "https://gateway.ipfs.io/ipfs/";

const GalleryView = ({ localProvider }) => {
	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState([]);

	const contracts = useContractLoader(localProvider);
  const contract = contracts ? contracts["YourContract"] : "";

	useEffect(() => {
    contract && getImagesAsync();
  }, [contract]);

	const getIpfsHashFromBytes32 = bytes32Hex => {
		const hashHex = "1220" + bytes32Hex.slice(2);
		const hashBytes = Buffer.from(hashHex, "hex");
		const hashStr = bs58.encode(hashBytes);
		return hashStr;
	};

	const getImagesAsync = async () => {
    const getImagesFn = contract.getImages;
    const imageHashes = await getImagesFn();
    const result = await Promise.all(
      imageHashes.map(async imageHash => {
        const moderationHash = await getModerationLabelsForImage(imageHash);
				const hasModerationLabels = ethers.constants.HashZero !== moderationHash;
				const moderationLabelsUrl = hasModerationLabels
					? `${ipfsGatewayUrl}${getIpfsHashFromBytes32(moderationHash)}`
					: "";

				let moderationLabels = "";
				if (hasModerationLabels) {
					const moderationLabelRequest = await axios.get(moderationLabelsUrl);
					moderationLabels = moderationLabelRequest.data.ModerationLabels
				}

        return {
          imageHash,
          moderationLabelsUrl,
					hasModerationLabels,
					moderationLabels
        };
      }),
    );
    setImages([...result].reverse());
		setLoading(false);
  };

  const getModerationLabelsForImage = async imageHash => {
    const result = await contract.imagesToModerationLabels(imageHash);
    return result;
  };

	if (loading) {
		return <Spinner />;
	}

  return (
		<GalleryPages images={images}/>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({
  localProvider: getLocalProvider
});

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));

export default hocChain(GalleryView);
