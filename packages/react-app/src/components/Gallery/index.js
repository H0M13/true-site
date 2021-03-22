import React, { useEffect, useState } from "react";
import { useContractLoader } from "../../hooks";

const Gallery = ({ provider }) => {
  const contracts = useContractLoader(provider);

  const contract = contracts ? contracts["YourContract"] : "";

  const [images, setImages] = useState([]);

  useEffect(() => {
    contract && getImagesAsync();
  }, [contract]);

  const getImagesAsync = async () => {
    const getImagesFn = contract.getImages;

    const result = await getImagesFn();

    setImages(result);
  };

  return (
    <>
      <div>Gallery Placeholder</div>
      <div>{images}</div>
    </>
  );
};

export default Gallery;
