import * as fs from 'fs';
import * as Mock from 'mockjs';

const mock = {};
fs.readdirSync(__dirname)
  .filter((filename) => filename !== 'index.ts')
  .forEach((filename) => {
    const mod = require(`./${filename}`).default;
    Object.assign(mock, mod(Mock));
  });

export default mock;
