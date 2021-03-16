import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { magenta } from 'colors';
import { AuthResolver } from './graphql/resolvers/auth/auth.resolver';
import { PostResolver } from './graphql/resolvers/posts/posts.resolver';

const port = process.env.PORT || 1000;

async function main() {
    await createConnection();
    const schema = await buildSchema({
        resolvers: [AuthResolver, PostResolver]
    });

    const server = new ApolloServer({
        schema,
        context: ctx => ctx
    });

    await server.listen(port);
    console.log(magenta(`Server on Port: ${port}`));
}

main();