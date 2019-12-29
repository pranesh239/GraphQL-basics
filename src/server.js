import { ApolloServer, gql } from 'apollo-server';
import { merge } from 'lodash';

import { typeResolver } from './utils';
import { AuthorResolvers } from './types/Authors/Authors.resolvers';
import { CourseResolvers } from './types/Courses/Courses.resolvers';

const types = ['Courses', 'Authors'];

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const start = async () => {
  try {
    const combineTypes = await Promise.all(types.map(typeResolver));

    const server = new ApolloServer({
      typeDefs: [typeDefs, ...combineTypes],
      resolvers: merge({}, AuthorResolvers, CourseResolvers)
    });

    server.listen().then(({ url }) => {
      console.log(`Listening to URL ${url}`);
    });
  } catch (err) {
    console.log('err', err);
  }
};

start();
