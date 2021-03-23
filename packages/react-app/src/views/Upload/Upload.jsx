import React, { Fragment } from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import ImageSelector from '../../components/ImageSelector'
import { Card, Button, Spin } from 'antd';
import { injectIntl } from 'react-intl'

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