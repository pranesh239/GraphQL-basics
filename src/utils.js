import fs from 'fs';
import path from 'path';

export const typeResolver = type => {
  const pathResolver = path.join(
    process.cwd(),
    `/src/types/${type}/${type}.gql`
  );
  return new Promise((resolve, reject) => {
    fs.readFile(pathResolver, 'utf-8', (err, schema) => {
      if (err) {
        // reject(err);
      }
      resolve(schema);
    });
  });
};
