import fetch from 'node-fetch';

const courseMapper = {
  book: 'BookCourse',
  online: 'OnlineCourse'
};

export const CourseResolvers = {
  Query: {
    courses() {
      return fetch(`http://localhost:3000/courses`).then(data => data.json());
    },
    course(_, args) {
      return fetch(`http://localhost:3000/courses/${args.id}`).then(data =>
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
  }
};
