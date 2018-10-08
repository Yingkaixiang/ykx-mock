import * as cors from '@koa/cors';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as yargs from 'yargs';

import mocks from './mock/';

const app = new Koa();
const router = new Router();

app.use(
  cors({
    credentials: true,
  }),
);

Object.keys(mocks).forEach((key) => {
  const req = key.split(' ');
  const method = req[0].toLowerCase();
  const url = req[1];
  router[method](url, (ctx) => {
    ctx.body = mocks[key](ctx);
  });
});

app.use(router.routes()).use(router.allowedMethods());

const port = yargs.argv.p || 3000;
app.listen(port);
