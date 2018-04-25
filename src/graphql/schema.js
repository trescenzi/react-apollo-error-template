import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const peopleData = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sara Smith' },
  { id: 3, name: 'Budd Deey' },
];

const PetType = new GraphQLObjectType({
  name: 'Pet',
  fields: {
    name: {type: GraphQLString}
  },
});

const petData = [{name: 'ServerPet'}];

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData,
    },
    pets: {
      type: new GraphQLList(PetType),
      resolve: () => petData,
    }
  },
});

export const schema = new GraphQLSchema({ query: QueryType });
