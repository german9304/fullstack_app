import styled from 'styled-components';
import Author from './Author';

const BookStyles = styled.section`
  box-shadow: 0 0 4px 1px rgba(100, 150, 200, 0.7);
  padding: 1.5em;
  margin-bottom: 1em;
  header {
    border-bottom: solid 1px #0074d9;
    margin-bottom: 0.9em;
  }
  h2,
  p {
    padding: 0;
    margin: 0;
    font-family: var(--global-font);
    margin-bottom: 0.5em;
  }
  cursor: pointer;
  :hover {
    box-shadow: 0 0 10px 1px rgba(100, 150, 200, 0.7);
  }
`;

function Book({ data }) {
  return (
    <BookStyles className={`book`}>
      <header>
        <h2 className='title'>{data.title}</h2>
      </header>
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
