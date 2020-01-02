import styled from 'styled-components';
import Author from './Author';
import Link from 'next/link';

const BookStyles = styled.section`
  box-shadow: 0 0 4px 1px rgba(100, 150, 200, 0.7);
  padding: 1.5em;
  margin-bottom: 1em;
  header {
    margin-bottom: 0.9em;
  }
  h2,
  p {
    padding: 0;
    margin: 0;
    font-family: var(--global-font);
    margin-bottom: 0.5em;
  }

  a[class='book-header'] header:hover {
    text-decoration: underline;
    color: rgba(100, 150, 200, 0.9);
    /* box-shadow: 0 0 10px 1px rgba(100, 150, 200, 0.7); */
  }

  /* .book-meta {
    padding: 0 0.3em;
  } */
`;

function Book({ data }) {
  return (
    <BookStyles className={`book`}>
      <Link href='/book/[id]' as={`/book/${data.book_id}`}>
        <a className='book-header'>
          <header>
            <h2 className='title'>{data.title}</h2>
          </header>
        </a>
      </Link>

      <div className='book-meta'>
        <div className='description'>
          <p>{data.description}</p>
        </div>
        <div className='type'>
          <span className='type-text'>{data.type}</span>
        </div>
      </div>
    </BookStyles>
  );
}

export default Book;
