import fetch from 'node-fetch';

export const AuthorResolvers = {
  Query: {
    authors() {
      return fetch(`http://localhost:3000/authors`).then(data => data.json());
    },
    author(_, args) {
      return fetch(`http://localhost:3000/authors/${args.id}`).then(data =>
        data.json()
      );
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
