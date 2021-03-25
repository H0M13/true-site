import React, { Fragment } from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import ImageSelector from '../../components/ImageSelector'
import { Card, Button, Spin } from 'antd';
import { injectIntl } from 'react-intl'
import axios from 'axios'

import './Upload.scss'
import { useState } from "react";

const UploadView = ({
	intl: {
		messages: {
			upload: {
				uploadTitle,
				submit,
			}
		}
	}
}) => {
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState(null);

	const apiPath = 'http://localhost:8000';

	const handleSubmit = () => {
		if (file) {
			setLoading(true);
			let data = new FormData();
			data.append('file', file);
			data.append('name', file.name);

			const options = {
				maxBodyLength: 'Infinity',
				headers: {
					'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
				}
			};

			axios.post(`${apiPath}/image/upload`, data, options)
				.then(result => console.info(result))
				.catch(error => console.error(error))
				.finally(() => {
					setLoading(false);
				});
		}
	};

  return (
		<Card 
			title={uploadTitle}
			style={{ 
			width: 400 
		}}>
			{
				loading ? (
					<Spin size="large" />	
				) : (
					<Fragment>
						<ImageSelector setFile={setFile} />
						{
							file && (
								<Button 
									type="primary" 
									className="submitButton"
									disabled={!file}
									onClick={() => handleSubmit()}
								>
									{ submit }
								</Button>
							)
						}
					</Fragment>
				)
			}
  	</Card>
	);
}

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	injectIntl,
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(UploadView);