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
			<MenuAnt.Item key="/gallery">
				<Link onClick={()=>{setRoute("/gallery")}} to="/gallery">Gallery</Link>
			</MenuAnt.Item>
			<MenuAnt.Item key="/upload">
				<Link onClick={()=>{setRoute("/upload")}} to="/upload">Upload</Link>
			</MenuAnt.Item>
			{/* <MenuAnt.Item key="/about">
				<Link onClick={()=>{setRoute("/about")}} to="/about">About</Link>
			</MenuAnt.Item>
			<MenuAnt.Item key="/">
				<Link onClick={()=>{setRoute("/")}} to="/">YourContract</Link>
			</MenuAnt.Item>
			<MenuAnt.Item key="/hints">
				<Link onClick={()=>{setRoute("/hints")}} to="/hints">Hints</Link>
			</MenuAnt.Item>
			<MenuAnt.Item key="/exampleui">
				<Link onClick={()=>{setRoute("/exampleui")}} to="/exampleui">ExampleUI</Link>
			</MenuAnt.Item> */}
		</MenuAnt>
	);
}

export default Menu;