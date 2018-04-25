import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class App extends Component {
  render() {
    const { data: { loading, pets} } = this.props;
    return (
      <main>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {pets.map(pet => <li key={pet.name}>{pet.name}</li>)}
          </ul>
        )
        }
      </main>
    );
  }
}

export default graphql(
  gql`
    query ErrorTemplate {
      pets {
        ...pet
      }
    }

    fragment pet on Pet {
      name
    }
`
)(App);
