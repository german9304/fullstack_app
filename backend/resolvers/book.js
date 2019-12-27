const queryDb = require('../lib/query');

const Book = {
  author({ author_id }, args, ctx, info) {
    const QUERY_AUTHOR = `
      SELECT author_id, email, name, last_name, password, age, created 
      FROM author WHERE author_id = $1
    `;
    const author_book = queryDb.dbOneQuery(ctx.db.DB, QUERY_AUTHOR, [
      author_id
    ]);
    return author_book;
  }
};

module.exports = Book;
