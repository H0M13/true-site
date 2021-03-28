import React from "react";
import { Route, Switch } from "react-router-dom";

import Gallery from "./Gallery/Gallery.jsx";
import Upload from "./Upload/Upload.jsx";
import ErrorPage from "./Error/Error.jsx";

const Routes = () => {
  return (
		<Switch>
			<Route path="/" component={Gallery} exact />
			<Route path="/upload" component={Upload} exact />
			<Route path="/error" component={ErrorPage} exact />
		</Switch>
	);
}

export default Routes;