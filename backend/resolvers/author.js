const queryDb = require('../lib/query');

const Author = {
  books(parent, args, ctx, info) {
    const createQuery = `
     SELECT book.book_id, book.title, book.description, book.type, book.created
     FROM author, book
     WHERE author.author_id = book.author_id AND author.author_id = $1
    `;
    const authorBooks = queryDb.dbQuery(ctx.db.DB, createQuery, [
      parent.author_id
    ]);
    return authorBooks;
  }
};

module.exports = Author;
