/**
 * This module contains the necessary resolvers,
 * to execute graphql mutations.
 */

const query = require('../lib/query.js');
const uniqid = require('uniqid');

const Mutation = {
  // Registration process for new user
  async signup(_, { author }, ctx, info) {
    const { name, last_name, email, password, age } = author;
    // Insert new row into database
    const INSERT_ROW = `
      INSERT INTO author (author_id, name, last_name, email, password, age)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING author_id, name, last_name, email, password, age
    `;
    const rowParams = [uniqid, name, last_name, email, password, age];
    const newAuthor = await query.dbOneQuery(ctx.db.DB, INSERT_ROW, rowParams);
    // Sets new cookie to store user session
    ctx.req.response.cookie('signedAuthor', newAuthor.author_id, {
      httpOnly: true
    });
    return newAuthor;
  },
  async signin(_, args, ctx, info) {
    const QUERY_AUTHOR = `
      SELECT author_id, name, last_name, email, created, password, age FROM author
      WHERE email = $1
    `;
    const author = await query.dbOneQuery(ctx.db.DB, QUERY_AUTHOR, [
      args.email
    ]);
    if (author.password !== args.password) {
      throw Error('password does not match, please try again');
      return;
    }

    ctx.req.response.cookie('signedAuthor', author.author_id, {
      httpOnly: true
    });
    return author;
  },
  signout(_, args, ctx, info) {
    const messageResult = msg => ({ message: msg });

    ctx.req.response.clearCookie('signedAuthor');
    if (ctx.req.request.cookies) {
      return messageResult('successfully signed out');
    }
    return messageResult('something went wrong');
  },
  // Create Book mutation
  createBook(_, { book }, ctx, info) {
    const { authorID } = ctx.req.request;
    const { title, description, type } = book;
    const INSERT_ROW = `
      INSERT INTO book (book_id, title, description, type, author_id)
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING book_id, title, description, author_id, type, created;
    `;
    const createdBook = query.dbOneQuery(ctx.db.DB, INSERT_ROW, [
      uniqid,
      title,
      description,
      type,
      authorID
    ]);
    return createdBook;
  },
  // Update book
  updateBook(_, { id, book }, ctx, info) {
    const QUERY_UPDATE = `
      UPDATE book SET 
      title = $1,
      type = $2,
      description = $3
      WHERE book_id = $4
      RETURNING book_id, title, type, description, author_id
    `;
    const { title, type, description } = book;

    const updatedBook = query.dbOneQuery(ctx.db.DB, QUERY_UPDATE, [
      title,
      type,
      description,
      id
    ]);

    return updatedBook;
  },
  // Delete book
  deleteBook(_, { id }, ctx, info) {
    console.log(`book id ${id}`);
    const DELETE_BOOK_QUERY = `
      DELETE FROM book WHERE book_id = $1
      RETURNING book_id, title, description, author_id, type, created
    `;
    const deletedBook = query.dbOneQuery(ctx.db.DB, DELETE_BOOK_QUERY, [id]);
    deletedBook.then(res => console.log(res));
    return deletedBook;
  }
};

module.exports = Mutation;
