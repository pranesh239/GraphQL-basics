import { ApolloServer, gql } from 'apollo-server';
import fetch from 'node-fetch';

const courseMapper = {
  book: 'BookCourse',
  online: 'OnlineCourse'
};

const typeDefs = gql`
  enum DurationUnits {
    hours
    minutes
  }

  interface Course {
    id: ID!
    title: String!
    author: Author!
    type: String!
  }

  type OnlineCourse implements Course {
    id: ID!
    title: String!
    author: Author!
    duration: Int
    type: String!
    durationIn: DurationUnits
  }

  type BookCourse implements Course {
    id: ID!
    title: String!
    author: Author!
    type: String!
    pages: Int
  }

  type Author {
    id: ID!
    name: String!
    course: [Course]
  }

  type Query {
    courses: [Course]
    course(id: ID!): Course!
    authors: [Author]
    author(id: ID!): Author
  }
`;

const resolvers = {
  Query: {
    courses() {
      return fetch(`http://localhost:3000/courses`).then(data => data.json());
    },
    course(_, args) {
      return fetch(`http://localhost:3000/courses/${args.id}`).then(data =>
        data.json()
      );
    },
    authors() {
      return fetch(`http://localhost:3000/authors`).then(data => data.json());
    },
    author(_, args) {
      return fetch(`http://localhost:3000/authors/${args.id}`).then(data =>
        data.json()
      );
    }
  },
  Course: {
    __resolveType(courseData) {
      return courseMapper[courseData.type];
    }
  },
  OnlineCourse: {
    author(courseData) {
      return fetch(
        `http://localhost:3000/authors/${courseData.author}`
      ).then(data => data.json());
    }
  },
  BookCourse: {
    author(courseData) {
      return fetch(
        `http://localhost:3000/authors/${courseData.author}`
      ).then(data => data.json());
    }
  },
  Author: {
    course(authorData) {
      const authorIDs = authorData.course.map(courseId => `id=${courseId}`);
      return fetch(
        `http://localhost:3000/courses?${authorIDs.join('&')}`
      ).then(data => data.json());
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Listening to URL ${url}`);
});
