import React, { Component } from "react";
import { graphql, ApolloClient } from "react-apollo";
import gql from "graphql-tag";

class App extends Component {
  componentDidMount() {
    getPerson.bind(this)();
  }

  constructor() {
    super();
    this.state = {
      people: null,
    };
  }

  render() {
    return (
      <main>
      {this.state.people ? 
        <div>
          {this.state.people.name}
          is currently
          {this.state.people.current_hobby.hobby_description.text}
        </div>
        : <div> loading </div>
      }
        <button onClick={changeCurrentHobby.bind(this)}>Switch to Biking</button>
      <pre>
        {JSON.stringify(this.props.client.cache, null, 2)}
      </pre>
      </main>
    );
  }
}

function changeCurrentHobby() {
  // in this query we have to grab the id and the cost of the current hobby because the
  // watch query that gets all of the related hobbies doesn't get the cost. As a result
  // simply getting the ID means there isn't enough information provided in the prefetched
  // hobbies to become a current hobby.
  this.props.client.mutate({
    mutation: gql`
    mutation update {
      updatePerson {
        id
        current_hobby {
          id
          cost
        }
      }
    }`
  })
}

function getPerson() {
  // Here we get both the current hobby and the list of hobbies.
  this.props.client.watchQuery({
    query:   gql`
    query getPerson{
      people {
        id
        name
        current_hobby {
          id
          hobby_description {
            text
          }
          cost 
        }
        hobbies {
          id
          hobby_description {
            season
            text
          }
        }
      }
    }
  `
  }).subscribe({
    next: ({data: {people}}) => {
      this.setState({people});
    }
  });
}

export default App;
/*
graphql(
  gql`
    query ErrorTemplate {
      people {
        id
        name
        current_hobby {
          id
          name
        }
        hobbies {
          id
          name
        }
      }
    }
  `
)(App);
*/
