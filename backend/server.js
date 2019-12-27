const Mutation = require('./resolvers/mutation');
const Query = require('./resolvers/query');
const Author = require('./resolvers/author');
const Book = require('./resolvers/book');
const queryDb = require('./lib/query');
const db = require('./db');

const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
  type Query {
    authors: [Author]!
    books: [Book]!
    book(id: String!): Book
    author(id: String!): Author
    me: Author!
  }

  type Mutation {
    signup(author: AuthorInput!): Author
    signin(email: String!, password: String!): Author
    signout: Message!
    createBook(book: BookInput!): Book!
    updateBook(id: String!, book: BookInput!): Book
    deleteBook(id: String!): Book
  }

  input BookInput {
    title: String!
    description: String!
    type: String!
  }

  input AuthorInput {
    name: String!
    last_name: String!
    email: String!
    password: String!
    age: Int!
  }

  type Message {
    message: String!
  }

  type Author {
    author_id: ID!
    name: String!
    email: String!
    last_name: String!
    password: String!
    age: Int!
    created: Date
    books: [Book]!
  }

  type Book {
    book_id: ID!
    title: String!
    description: String!
    type: String!
    created: Date
    author: Author!
  }

  scalar Date
`;

const resolvers = {
  Query,
  Mutation,
  Author,
  Book
};

// Middleware to check if user is authenticated,
// If user is authenticated perfom mutation
async function loggedInCheck(resolve, root, args, ctx, info) {
  const httpReq = ctx.req.request;
  if (!httpReq.authorID) throw Error('user is not authenticated');
  const result = await resolve(root, args, ctx, info);
  return result;
}

// Middleware setup for mutations
const mutationMiddleWare = {
  Mutation: {
    createBook: loggedInCheck,
    deleteBook: loggedInCheck,
    updateBook: loggedInCheck
  }
};

const queryMiddleWare = {
  Query: {
    book: loggedInCheck
  }
};

const middlewares = [mutationMiddleWare, queryMiddleWare];

const server = new GraphQLServer({
  context: req => ({ req, db }),
  typeDefs,
  resolvers,
  middlewares
});

module.exports = server;
