import React, { useState } from "react";
import { Upload, Button, Space, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";

const ImageSelector = ({
	setFile: setParentFile
}) => {
	const [fileList, setFileList] = useState([]);
	const [previewImage, setPreviewImage] = useState(null);

	const props = {
		onRemove: () => {
			setFileList([]);
			setParentFile(null);
			setPreviewImage(null);
		},
		beforeUpload: file => {
			setFileList([file]);
			handleFiles(file);
			setParentFile(file);
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
		reader.onload = (() => {
			return function (e) {
				setPreviewImage(e.target.result);
			};
		})(img);

		reader.readAsDataURL(file);
	}

	return (
		<Space direction="vertical" style={{ width: '100%' }} size="small">
			{
				previewImage && fileList.length > 0 &&
				<Image
					className="uploadImage"
					src={previewImage}
				/>
			}
			<Upload
				{...props}
			>
				{fileList.length === 0 && <Button icon={<UploadOutlined />}>Select Image (Max: 1)</Button>}
			</Upload>
		</Space>
	);
}

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	connect(mapStateToProps),
);

export default hocChain(ImageSelector);