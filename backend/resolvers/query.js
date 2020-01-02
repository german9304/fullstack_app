/**
 * This module contains the necessary resolvers
 * to execute graphql queries.
 */

const query = require('../lib/query.js');

const Query = {
  // Queries all authors stored in the databse
  authors(_, args, ctx, info) {
    const authors = query.dbQuery(
      ctx.db.DB,
      'SELECT author_id, email, name, last_name, password, age, created  FROM author',
      []
    );
    return authors;
  },
  // Queries all books stored in the databse
  books(parent, args, ctx, info) {
    const books = query.dbQuery(
      ctx.db.DB,
      'SELECT book_id, title, description, author_id, type, created FROM book'
    );
    return books;
  },
  // Queries one stored in the databse
  book(parent, { id }, ctx, info) {
    const SINGLE_QUERY = `
      SELECT book_id, title, description, author_id, type FROM book
      WHERE book_id = $1
    `;
    const book = query.dbOneQuery(ctx.db.DB, SINGLE_QUERY, [id]);
    return book;
  },
  me(parent, args, ctx, info) {
    // if author id does not exists return null
    if (!ctx.req.request.authorID) {
      return null;
    }
    const { authorID } = ctx.req.request;
    const SIGNED_USER_QUERY = `
      SELECT author_id, name, email, last_name, password, age, created FROM author
      WHERE author_id = $1
    `;
    const user = query.dbOneQuery(ctx.db.DB, SIGNED_USER_QUERY, [authorID]);
    return user;
  }
};

// docker-compose run -v "$PWD"/backend/:/backend/ --name=backend_node_postgresql backend bash

module.exports = Query;
