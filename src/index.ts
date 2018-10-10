import * as cors from '@koa/cors';
import { ApolloServer, gql } from 'apollo-server-koa';
import chalk from 'chalk';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as yargs from 'yargs';

import mocks from './mock/';
import { probability, sleep } from './util';

const app = new Koa();
const router = new Router();

app.use(
  cors({
    // Access-Control-Allow-Credentials
    // 允许跨域 ajax 操作 cookie
    // 前端需要在 http 请求中添加 withCredentials
    credentials: true,
  }),
);

Object.keys(mocks).forEach((key) => {
  const req = key.split(' ');
  const method = req[0].toLowerCase();
  const url = req[1];
  router[method](url, async (ctx) => {
    const timeout = probability({
      '2': 10000,
      '8': 5000,
      '90': 1000,
    });
    await sleep(timeout);
    ctx.body = mocks[key](ctx);
  });
});

app.use(router.routes()).use(router.allowedMethods());

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

const port = yargs.argv.p || 3000;

app.listen({ port }, () =>
  console.log(chalk.inverse(`🚀 Server ready at http://localhost:${port}`)),
);
