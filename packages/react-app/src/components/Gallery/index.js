import React, { useEffect, useState } from "react";
import { useContractLoader } from "../../hooks";
import bs58 from "bs58";
import { ethers } from "ethers";

const Gallery = ({ provider }) => {
  const contracts = useContractLoader(provider);

  const contract = contracts ? contracts["YourContract"] : "";

  const [images, setImages] = useState([]);

  useEffect(() => {
    contract && getImagesAsync();
  }, [contract]);

  const getImagesAsync = async () => {
    const getImagesFn = contract.getImages;

    const imageHashes = await getImagesFn();

    const result = await Promise.all(
      imageHashes.map(async imageHash => {
        const moderationLabels = await getModerationLabelsForImage(imageHash);

        return {
          imageHash,
          moderationLabels,
        };
      }),
    );

    console.log(result);

    setImages([...result]);
  };

  const getModerationLabelsForImage = async imageHash => {
    const result = await contract.imagesToModerationLabels(imageHash);

    console.log(result);

    return result;
  };

  const getIpfsHashFromBytes32 = bytes32Hex => {
    // Add our default ipfs values for first 2 bytes:
    // function:0x12=sha2, size:0x20=256 bits
    // and cut off leading "0x"
    const hashHex = "1220" + bytes32Hex.slice(2);
    const hashBytes = Buffer.from(hashHex, "hex");
    const hashStr = bs58.encode(hashBytes);
    return hashStr;
  };

  const ipfsGatewayUrl = "https://gateway.ipfs.io/ipfs/";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>Gallery Placeholder</div>
      {images.map(image => {
        const imageHashUrl = `${ipfsGatewayUrl}${image.imageHash}`;

        const hasModerationLabels = ethers.constants.HashZero !== image.moderationLabels;

        const moderationLabelsUrl = hasModerationLabels
          ? `${ipfsGatewayUrl}${getIpfsHashFromBytes32(image.moderationLabels)}`
          : "";

        return (
          <>
            {hasModerationLabels && (
              <>
                <img style={{ maxWidth: "400px", maxHeight: "400px" }} src={imageHashUrl} />
                <span>
                  Moderation labels: <a href={moderationLabelsUrl}>{moderationLabelsUrl}</a>
                </span>
              </>
            )}
          </>
        );
      })}
    </div>
  );
};

export default Gallery;
