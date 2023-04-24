import { createYoga, createSchema } from "graphql-yoga";

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      cart(id: ID!): Cart!
    }

    type Cart {
      id: ID!
      totalItems: Int!
      items: [CartItem]
      subTotal: Money!
    }

    type CartItem {
      id: ID!
      name: String!
    }

    type Money {
      amount: Int!
      formatted: String!
    }
  `,
  resolvers: {
    Query: {
      cart: (_, { id }) => ({
        id,
        totalItems: 1,
        items: [{ id: "item-1", name: "Stickers" }],
        subTotal: {
          amount: 1000,
          formatted: "£10",
        },
      }),
    },
  },
});

interface Env {
  // Bindings
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const yoga = createYoga({
      graphqlEndpoint: "/",
      landingPage: false,
      schema,
    });

    return yoga.fetch(request, env, ctx);
  },
};
