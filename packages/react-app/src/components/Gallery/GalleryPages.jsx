import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { Pagination } from 'antd';
import GalleryImage from './Image'

import './gallery.scss'

const GalleryImages = ({ images }) => {
	const [page, setPage] = useState(1);
	const imagePerPage = 6;

	const pageChange = (page, pageSize) => {
		setPage(page);
	};

	const getPage = () => {
		const start = Math.min((page-1) * imagePerPage, images.length);
		const end = Math.min(start + imagePerPage, images.length);
		return images.slice(start, end);
	};

  return (
		<Fragment>
			<div className="galleryPage">
				{
					getPage().map(image => <GalleryImage key={image.imageHash} image={image} />)
				}
			</div>
			
			<Pagination 
				defaultCurrent={page} 
				defaultPageSize={imagePerPage}
				total={images.length} 
				onChange={(page, pageSize) => pageChange(page, pageSize)} 
			/>
		</Fragment>
  );
};

export default GalleryImages;
