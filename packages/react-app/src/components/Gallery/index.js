import React, { useEffect, useState } from "react";
import { useContractLoader, useGasPrice } from "../../hooks";
import Transactor from "../../utils/Transactor"

const Gallery = ({ provider, targetNetwork }) => {
  const contracts = useContractLoader(provider);

  const contract = contracts ? contracts["YourContract"] : "";

  const [images, setImages] = useState([]);
  
  const gasPrice = useGasPrice(targetNetwork, "fast");

  useEffect(() => {
    contract && getImagesAsync();
  }, [contract]);

  const getImagesAsync = async () => {
    const getImagesFn = contract.getImages;

    const result = await getImagesFn();

    setImages(result);
  };

  const postDemoContentHash = async () => {
    const addImageFn = contract.addImage;

    const transactor = Transactor(provider, gasPrice);

    const result = await transactor(addImageFn("QmdT7hKV1EfuaXSAYa65KUZWJnxF96yRPZNS9WeG8gUABC"));
    return result;
  };

  return (
    <>
      <div>Gallery Placeholder</div>
      <div>{images}</div>
      <button onClick={postDemoContentHash}>Post demo hash</button>
    </>
  );
};

export default Gallery;
