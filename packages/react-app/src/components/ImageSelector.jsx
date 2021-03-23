import React, { useState } from "react";
import { Upload, Button, Space, Image  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";


const ImageSelector = ({
	intl: {
		messages: {
			upload: {
				uploadSelect,
			}
		}
	},
	setFile: setParentFile
}) => {
	const [fileList, setFileList] = useState([]);
	const [previewImage, setPeviewImage] = useState(null);

	const props = {
		onRemove: () => {
			setFileList([]);
			setParentFile(null);
			setPeviewImage(null);
		},
		beforeUpload: file => {
			setFileList([file]);
			setParentFile(file);
			handleFiles(file);
			return false;
		},
		fileList,
		listType: 'picture',
		maxCount: 1
	};

	const handleFiles = (file) => {
		const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    
    const reader = new FileReader();
    reader.onload = (() => { return function(e) { 
			setPeviewImage(e.target.result);
		}; })(img);

    reader.readAsDataURL(file);
	}

  return (
		<Space direction="vertical" style={{ width: '100%' }} size="small">
			{
				previewImage && fileList.length > 0 && 
					<Image
						width={200}
						src={previewImage}
					/> 
			}
			<Upload
				{ ...props }
			>
				{ fileList.length == 0 && <Button icon={<UploadOutlined />}>{uploadSelect}</Button> }
			</Upload>
  	</Space>
	);
}

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	injectIntl,
	connect(mapStateToProps),
);

export default hocChain(ImageSelector);