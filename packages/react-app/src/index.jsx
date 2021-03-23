import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Provider as ReduxProvider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from "./utils/duck";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

let subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract"

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache()
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
	<ReduxProvider store={store}>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App subgraphUri={subgraphUri}/>
			</ApolloProvider>
		</BrowserRouter>
	</ReduxProvider>,
  document.getElementById("root"),
);
