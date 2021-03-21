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
			<Route path="/" component={Contract} exact />
			<Route path="/gallery" component={Gallery} exact />
			<Route path="/upload" component={Upload} exact />
			<Route path="/about" component={About} exact />
			<Route path="/hints" component={Hints} exact />
			<Route path="/exampleui" component={ExampleUI} exact />
		</Switch>
	);
}

export default Routes;