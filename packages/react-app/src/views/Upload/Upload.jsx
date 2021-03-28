import React, { Fragment } from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import ImageSelector from "../../components/ImageSelector";
import { Card, Button, Spin } from "antd";
import { injectIntl } from "react-intl";
import axios from "axios";
import { getInjectedProvider, getLocalProvider, getTargetNetwork } from "../../utils/duck";
import { useUserProvider, useGasPrice, useContractLoader } from "../../hooks";
import "./Upload.scss";
import { useState } from "react";
import Transactor from "../../utils/Transactor";
import { useHistory } from 'react-router-dom';

const UploadView = ({
  intl: {
    messages: {
      upload: { uploadTitle, submit },
			error: { api: apiError },
    },
  },
  localProvider,
  injectedProvider,
  targetNetwork,
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const userProvider = useUserProvider(injectedProvider, localProvider);
	const history = useHistory();

  const apiPath = "https://truesite.link";

  const provider = localProvider;
  const signer = userProvider.getSigner();

  const contracts = useContractLoader(provider);

  const contract = contracts ? contracts["YourContract"] : "";

  const gasPrice = useGasPrice(targetNetwork, "fast");

  const handleSubmit = () => {
    if (file) {
      setLoading(true);
      let data = new FormData();
      data.append("file", file);
      data.append("name", file.name);

      const options = {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      };

      axios
        .post(`${apiPath}/api/upload`, data, options)
        .then(result => {
					console.info(result)
					return postContentHash(result.data.IpfsHash)
				})
        .catch(error => {
					console.error(error);
					history.push('/error', {
						message: apiError
					});
				})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const postContentHash = async (ipfsHash) => {
    const addImageFn = contract.connect(signer).addImage;
    const transactor = Transactor(provider, gasPrice);
    const result = await transactor(addImageFn(ipfsHash));
    return result;
  };

  return (
    <Card
      title={uploadTitle}
      style={{
        width: 400,
      }}
    >
      {loading ? (
        <Spin size="large" />
      ) : (
        <Fragment>
          <ImageSelector setFile={setFile} />
          {file && (
            <Button type="primary" className="submitButton" disabled={!file} onClick={() => handleSubmit()}>
              {submit}
            </Button>
          )}
        </Fragment>
      )}
    </Card>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({
  localProvider: getLocalProvider,
  injectedProvider: getInjectedProvider,
  targetNetwork: getTargetNetwork,
});

const hocChain = compose(injectIntl, connect(mapStateToProps, mapDispatchToProps));

export default hocChain(UploadView);
