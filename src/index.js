import "./index.css";

import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";

import { link } from "./graphql/link";
import App from "./App";

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  resolvers: {
    Query: {},
  },
  defaults: {
    pets: [
      {
        name: 'ClientPet',
        __typename: 'Pet',
      },
    ],
  }
});
  

const client = new ApolloClient({
  cache,
  link: stateLink.concat(link),
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
