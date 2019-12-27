/**
 *  Books component
 *
 *
 */

import gql from 'graphql-tag';
import styled from 'styled-components';
import Book from './Book';

import { useQuery } from '@apollo/react-hooks';

const BooksStyles = styled.article`
  h1 {
    text-align: center;
    font-family: var(--global-font);
  }
`;

export const GET_BOOK_QUERY = gql`
  query QUERY_BOOKS {
    books {
      book_id
      title
      description
      type
      created
      author {
        author_id
        name
        email
      }
    }
  }
`;

function Books() {
  let { loading, data, error } = useQuery(GET_BOOK_QUERY);

  if (loading) return <p>loading...</p>;
  if (error) throw Error(error);

  return (
    <BooksStyles className='books'>
      <h1 className='article-header'>Books</h1>
      {data.books.map(book => {
        return <Book key={book.book_id} data={book} />;
      })}
    </BooksStyles>
  );
}

export default Books;
