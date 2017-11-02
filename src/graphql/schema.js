import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const HobbyDescriptionType = new GraphQLObjectType({
  name: 'HobbyDescription',
  fields: {
    text: { type: GraphQLString },
    season: { type: GraphQLString },
  },
});

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  fields: {
    id: { type: GraphQLID },
    cost: { type: GraphQLString },
    hobby_description: { type: HobbyDescriptionType },
  },
});

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    hobbies: { type: new GraphQLList(HobbyType) },
    current_hobby: { type: HobbyType },
  },
});

const person = 
  { 
    id: 1,
    name: 'John Smith',
    hobbies: [ 1, 2 ],
    current_hobby: 1,
  };

const hobbyData = [
  { 
    id: 1,
    const: 'a lot',
    hobby_description: 
    {
      text: 'Skiing',
      season: 'Winter',
    }
  },
  { 
    id: 2,
    hobby_description: {
      text: 'Biking',
      cost: 'some',
      season: 'Not Winter',
    }
  },
  {
    id: 3,
    hobby_description: {
      text: 'Hiking',
      cost: 'low',
      season: 'All',
    }
  },
];

function getPerson() {
  return {
        name: person.name,
        id: person.id,
        hobbies: person.hobbies.map((hobbyId) => hobbyData[hobbyId - 1]),
        current_hobby: hobbyData[person.current_hobby - 1],
      };
}

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: PersonType,
      resolve: getPerson,
    },
  },
});

export const schema = new GraphQLSchema({ 
  query: QueryType,
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      updatePerson: {
        type: PersonType,
        resolve: () => {
          person.current_hobby = 2;
          return getPerson();
        },
      }
    }
  })
});
