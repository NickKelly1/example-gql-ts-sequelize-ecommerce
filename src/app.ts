import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { graphqlHTTP, } from 'express-graphql';
import {
  GraphQLObjectType,
  GraphQLSchema,
  Thunk,
} from 'graphql';
import { SequelizeSingleton } from './sequelize';
import { initProduct, initProductRelations, } from './product/product.model';
import { initCategory, initCategoryRelations } from './category/category.model';
import { UniversalServiceContainer } from './common/container/universal-service-container';
import { RequestServiceContainer } from './common/container/request-service-container';
import { HttpContext } from './common/contexts/http-context';
import { GqlContext } from './common/contexts/gql-context';
import { ProductGqlQuery } from './product/product.gql.query';
import { CategoryGqlQuery } from './category/category.gql.query';
import { CategoryGqlMutation } from './category/category.gql.mutation';
import { ProductGqlMutation } from './product/product.gql.mutation';
import { Auth } from './common/classes/auth';

const port = 3001;

function unthunk<T>(mbThunk: Thunk<T>): T {
  if (typeof mbThunk === 'function') return (mbThunk as () => T)();
  return mbThunk;
}

// app.use((req, res, next) => (async () => {
// })().catch(next));

async function start() {
  const app = express();

  /**
   * GraphQL
   */
  const GqlQuery = new GraphQLObjectType<unknown, GqlContext>({
    name: 'RootQueryType',
    fields: {
      ...unthunk(ProductGqlQuery),
      ...unthunk(CategoryGqlQuery),
    },
  });


  const GqlMutation = new GraphQLObjectType<unknown, GqlContext>({
    name: 'RootMutationType',
    fields: {
      ...unthunk(CategoryGqlMutation),
      ...unthunk(ProductGqlMutation),
    },
  });

  const schema = new GraphQLSchema({
    query: GqlQuery,
    mutation: GqlMutation,
  });


  const sequelize = SequelizeSingleton;

  // models
  initCategory(sequelize);
  initProduct(sequelize);

  // model relations
  initCategoryRelations(sequelize);
  initProductRelations(sequelize);

  await SequelizeSingleton.authenticate();
  await SequelizeSingleton.sync();

  // verify connection
  const universal = new UniversalServiceContainer(SequelizeSingleton);

  app.use(morgan('dev'));
  app.use((req, res, next) => {
    // auth must access permissions, user_id, etc...
    // TODO: passport!
    const auth = new Auth();
    const ctx = new HttpContext(req, res, universal, auth);
    ctx.attachServices(new RequestServiceContainer(ctx));
    res.locals.httpCtx = ctx;
    next();
  });

  const gqlApp = (req: Request, res: Response) => graphqlHTTP(({
    schema: schema,
    graphiql: true,
    context: GqlContext.fromHttpContext(res.locals.httpCtx),
  }))(req, res);

  app.use('/gql', gqlApp);

  app.listen(port, () => console.log(`server listening on ${port}`));
}

setTimeout(start, 0);