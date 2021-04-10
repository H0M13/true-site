import React, { useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import { getLocalProvider } from "../../utils/duck";
import { ethers } from "ethers";
import { useContractLoader, useEventListener } from "../../hooks";
import GalleryPages from "../../components/Gallery/GalleryPages";
import axios from "axios";
import bs58 from "bs58";
import Spinner from "../../components/Spinner/Spinner.jsx";

const ipfsGatewayUrl = "https://gateway.ipfs.io/ipfs/";

const GalleryView = ({ localProvider }) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [moderationLabelsCache, setModerationLabelsCache] = useState([]);

  const contracts = useContractLoader(localProvider);
  const contract = contracts ? contracts["YourContract"] : "";

  const imageAddedUpdates = useEventListener(contracts, "YourContract", "ImageAdded", localProvider);

  // When new images are added prepend the unmoderated image to the array of images to display.
  // The `hasModerationLabels: false` flag indicates it is pending moderation.
  useEffect(() => {
    if (imageAddedUpdates.length > 0) {
      let newImages = [];

      imageAddedUpdates.map(update => {
        const { _imageContentHash } = update;

        const currentImageHashes = images.map(image => image.imageHash);

        if (!currentImageHashes.includes(_imageContentHash)) {
          newImages.push({
            imageHash: _imageContentHash,
            hasModerationLabels: false,
            moderationLabels: "",
          });
        }
      });

      if (newImages.length > 0) {
        setImages([...newImages, ...images]);
      }
    }
  }, [imageAddedUpdates]);

  const moderationCompletedUpdates = useEventListener(contracts, "YourContract", "ModerationCompleted", localProvider);

  const replaceImagesWithNewModerationDataAsync = async updates => {
    const moderationCompletedImageHashes = updates.map(update => update._imageContentHash);

    await backfillImagesWithModerationData(moderationCompletedImageHashes);
  };

  const backfillImagesWithModerationData = async imageContentHashes => {
    const loadedImagesNeedingModerationLabelData = images.filter(
      image => imageContentHashes.includes(image.imageHash) && image.hasModerationLabels === false,
    );

    const imagesWithNewData = await getImageDataFromImageHashesAsync(
      loadedImagesNeedingModerationLabelData.map(image => image.imageHash),
    );
    const imagesHashesWithNewData = imagesWithNewData.map(image => image.imageHash);

    const fullImageArrayContainingReplacedImages = images.map(image => {
      if (imagesHashesWithNewData.includes(image.imageHash)) {
        return imagesWithNewData.filter(newImage => image.imageHash === newImage.imageHash)[0];
      }

      return image;
    });

    setImages(fullImageArrayContainingReplacedImages);
  };

  // When moderation is complete set the moderation labels against the image in our images array.
  useEffect(() => {
    if (moderationCompletedUpdates.length > 0) {
      replaceImagesWithNewModerationDataAsync(moderationCompletedUpdates);
    }
  }, [moderationCompletedUpdates]);

  useEffect(() => {
    contract && getImagesAsync();
  }, [contract]);

  const getIpfsHashFromBytes32 = bytes32Hex => {
    const hashHex = "1220" + bytes32Hex.slice(2);
    const hashBytes = Buffer.from(hashHex, "hex");
    const hashStr = bs58.encode(hashBytes);
    return hashStr;
  };

  const getImageDataFromImageHashesAsync = async imageHashes => {
    const imageHashModerationLabelsHashPairs = await Promise.all(
      imageHashes.map(async imageHash => {
        const moderationLabelsHash = await getModerationLabelsForImage(imageHash);
        return {
          imageHash: imageHash,
          moderationLabelsHash: moderationLabelsHash,
        };
      }),
    );

    const moderationLabelsHashes = imageHashModerationLabelsHashPairs.map(
      imageHashModerationLabelsHashPair => imageHashModerationLabelsHashPair.moderationLabelsHash,
    );

    const nonEmptyModerationLabelsHashes = moderationLabelsHashes.filter(
      moderationLabelsHash => moderationLabelsHash !== ethers.constants.HashZero,
    );

    const uniqueModerationLabelsHashes = [...new Set(nonEmptyModerationLabelsHashes)];

    const moderationLabelResults = await Promise.all(
      uniqueModerationLabelsHashes.map(async moderationLabelsHash => {
        const moderationLabelsUrl = `${ipfsGatewayUrl}${getIpfsHashFromBytes32(moderationLabelsHash)}`;

        const moderationLabelRequest = await axios.get(moderationLabelsUrl);
        return {
          moderationLabelsHash: moderationLabelsHash,
          moderationLabels: moderationLabelRequest.data.ModerationLabels,
        };
      }),
    );

    return await Promise.all(
      imageHashes.map(async imageHash => {
        const moderationLabelsHash = imageHashModerationLabelsHashPairs.find(
          imageHashModerationLabelsHashPair => imageHashModerationLabelsHashPair.imageHash === imageHash,
        )?.moderationLabelsHash;

        const hasModerationLabels = moderationLabelsHash && ethers.constants.HashZero !== moderationLabelsHash;

        let moderationLabels = "";

        if (hasModerationLabels) {
          const matchingModerationLabels = moderationLabelResults.find(
            moderationLabelResult => moderationLabelResult.moderationLabelsHash === moderationLabelsHash,
          );

          if (matchingModerationLabels) {
            moderationLabels = matchingModerationLabels.moderationLabels;
          }
        }

        return {
          imageHash,
          hasModerationLabels,
          moderationLabels,
          moderationLabelsHash,
        };
      }),
    );
  };

  const getImagesAsync = async () => {
    const getImagesFn = contract.getImages;
    const imageHashes = await getImagesFn();
    const result = imageHashes.map(imageHash => ({
      imageHash,
      hasModerationLabels: false,
      moderationLabels: "",
    }));
    setImages([...result].reverse());
    setLoading(false);
  };

  const getModerationLabelsForImage = async imageHash => {
    const result = await contract.imagesToModerationLabels(imageHash);
    return result;
  };

  const handlePageChange = (pageNo, pageSize) => {
    console.log(pageNo);
    console.log(pageSize);

    const start = Math.min((pageNo - 1) * pageSize, images.length);
    const end = Math.min(start + pageSize, images.length);
    const imageHashes = images.slice(start, end).map(image => image.imageHash);
    backfillImagesWithModerationData(imageHashes);
  };

  if (loading) {
    return <Spinner />;
  }

  return <GalleryPages images={images} onPageChange={handlePageChange} />;
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({
  localProvider: getLocalProvider,
});

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));

export default hocChain(GalleryView);
