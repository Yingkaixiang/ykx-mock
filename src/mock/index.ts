import * as fs from 'fs';

const mock = {};
fs.readdirSync(__dirname)
  .filter((filename) => filename !== 'index.ts')
  .forEach((filename) => {
    const mod = require(`./${filename}`).default;
    Object.assign(mock, mod);
  });

export default mock;
