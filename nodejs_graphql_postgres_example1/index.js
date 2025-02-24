import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      return await prisma.user.create({
        data: { name, email },
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(cors());
app.use(bodyParser.json());

const startServer = async () => {
  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(4000, () => {
    console.log("🚀 Server running at http://localhost:4000/graphql");
  });
};

startServer();

