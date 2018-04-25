import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class App extends Component {
  render() {
    const { data: { loading, people, pets, error } } = this.props;
    return (
      <main>
        {loading ? (
          <p>Loading…</p>
        ) : /*(
          <ul>
            {people.map(person => <li key={person.id}>{person.name}</li>)}
            {pets.map(pet => <li key={pet.name}>{pet.name}</li>)}
          </ul>
        )*/
          (<p>{error.toString()}</p>)
        }
      </main>
    );
  }
}

export default graphql(
  gql`
    query ErrorTemplate {
      people {
        ...person
      }

      pets @client {
        ...pet
      }
    }

    fragment person on Person {
      id
      name
    }

    fragment pet on Pet {
      name
    }
`
)(App);
