import React from "react";
import { Route, Switch } from "react-router-dom";

import Error from "./Error/Error";
import Main from "./Main/Main";
// import Example from "./Example/Example";

const Routes = () => {
  return (
		<Switch>
			<Route path="/" component={Main} exact />
			<Route component={Error} />
		</Switch>
	);
}

export default Routes;