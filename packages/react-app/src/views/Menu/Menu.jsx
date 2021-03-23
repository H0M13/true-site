import React, { useState, useEffect } from "react";
import { Menu as MenuAnt } from "antd";
import { Link } from "react-router-dom";

const Menu = ({
}) => {
  const [route, setRoute] = useState();
  useEffect(() => {
    setRoute(window.location.pathname)
  }, [setRoute]);

  return (
		<MenuAnt style={{ textAlign:"center" }} selectedKeys={[route]} mode="horizontal">
			<MenuAnt.Item key="/">
				<Link onClick={()=>{setRoute("/")}} to="/">Gallery</Link>
			</MenuAnt.Item>
			<MenuAnt.Item key="/upload">
				<Link onClick={()=>{setRoute("/upload")}} to="/upload">Upload</Link>
			</MenuAnt.Item>
		</MenuAnt>
	);
}

export default Menu;