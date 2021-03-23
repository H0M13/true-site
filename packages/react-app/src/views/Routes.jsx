import React from "react";
import { Route, Switch } from "react-router-dom";

import About from "./About/About.jsx";
import Contract from "./Contract/Contract.jsx";
import Hints from "./Hints/Hints.jsx"
import ExampleUI from "./ExampleUI/ExampleUI.jsx"
import Gallery from "./Gallery/Gallery.jsx";
import Upload from "./Upload/Upload.jsx";

const Routes = () => {
  return (
		<Switch>
			<Route path="/" component={Gallery} exact />
			<Route path="/upload" component={Upload} exact />
		</Switch>
	);
}

export default Routes;