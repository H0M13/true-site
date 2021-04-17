import React, { Fragment } from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import ImageSelector from "../../components/ImageSelector";
import { Card, Button, Space, Typography } from "antd";
import axios from "axios";
import { getInjectedProvider, getLocalProvider, getTargetNetwork } from "../../utils/duck";
import { useUserProvider, useGasPrice, useContractLoader } from "../../hooks";
import "./Upload.scss";
import { useState } from "react";
import Transactor from "../../utils/Transactor";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import UserInstructions from "../../components/UserInstructions";

const UploadView = ({
	localProvider,
	injectedProvider,
	targetNetwork,
}) => {
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState(null);
	const userProvider = useUserProvider(injectedProvider, localProvider);
	const history = useHistory();

	const apiPath = process.env.REACT_APP_API_URL || "https://truesite.link";

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

			const endpoint = `${apiPath}/api/upload`;
			axios
				.post(endpoint, data, options)
				.then(result => {
					console.info(result);
					return postContentHash(result.data.IpfsHash);
				})
				.catch(error => {
					console.error(error);
					history.push("/error", {
						message: 'Error connecting to the API, please check your connection.',
					});
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const postContentHash = async ipfsHash => {
		const addImageFn = contract.connect(signer).addImage;
		const transactor = Transactor(provider, gasPrice);
		const result = await transactor(addImageFn(ipfsHash));
		return result;
	};

	return (
		<Space size='middle' wrap='true' align='center'>
			<UserInstructions />
			<Card
				style={{
					width: 400,
				}}
			>
				<Typography.Title level={2}><span role="img" aria-label="emoji artwork">🖼️</span> Upload Image</Typography.Title>
				{loading ? (
					<Spinner />
				) : (
					<Fragment>
						<ImageSelector setFile={setFile} />
						{file && (
							<Button 
								type="primary" 
								className="submitButton" 
								// disabled={!file}
								disabled={true} 
								onClick={() => handleSubmit()}
							>
								Submit
							</Button>
						)}
					</Fragment>
				)}
				<div className="archived">
					TrueSight is currently archived and is not accepting new uploads. You can see the project in action at our <a href="https://devpost.com/software/truesight">Hackathon Devpost</a>
				</div>
			</Card>
		</Space>
	);
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({
	localProvider: getLocalProvider,
	injectedProvider: getInjectedProvider,
	targetNetwork: getTargetNetwork,
});

const hocChain = compose(connect(mapStateToProps, mapDispatchToProps));

export default hocChain(UploadView);
