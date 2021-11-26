import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import { makeExecutableSchema } from "@graphql-tools/schema";
import graphqlResolver from './resolvers';


const schema = makeExecutableSchema({
  typeDefs: loadSchemaSync('./src/schemas/**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  }),
  resolvers: graphqlResolver,
});

const server = express();
const PORT = process.env.PORT || 4000;

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);


server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
