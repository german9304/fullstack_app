import styled from 'styled-components';
import useMe from './components/Author';
import Books from './components/Books';
import WithLayout from './components/Layout';
import gql from 'graphql-tag';
import Form from './components/styles/FormStyles';
import StyledButton from '../pages/components/styles/ButtonStyles';

import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

const StyleContainer = styled.div`
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(2, 500px);
  p {
    padding: 0;
    font-family: var(--global-font);
    margin: 0;
  }
  .author {
    display: flex;
    justify-content: center;
  }

  .author .author-information .name {
    font-family: 'Fredoka One', cursive;
  }
  .author p {
    margin: 0.4em 0;
  }

  .books_cread_icons_text {
    display: flex;
    padding: 1em 0;
    align-items: center;
    border: solid 0.1em rgba(0, 0, 0, 0.5);
    cursor: pointer;
    margin-bottom: 1em;
  }

  .books_add_icon span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1em;
  }

  .createbooks_form {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 12;
    display: none;
    justify-content: center;
    align-items: center;
  }

  .createbooks_form.open {
    display: flex;
  }

  .form-description {
    padding: 0;
    font-family: var(--global-font);
    /* text-align: center; */
  }

  .createbooks_form form {
    width: 500px;
  }

  .create_books_form_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
  }
  .create_books_form_header .close-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .close-material-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CREATE_BOOK_MUTATION = gql`
  mutation CREATE_BOOK_MUTATION($book: BookInput!) {
    createBook(book: $book) {
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

function Feed() {
  const [close, setClose] = useState(true);
  const [createBookMutation, { loading, error }] = useMutation(
    CREATE_BOOK_MUTATION
  );
  const currentUser = useMe();
  const data = currentUser.data ? currentUser.data.me : null;

  const setOpenClass = closeState => {
    let openClassName = 'createbooks_form';
    if (closeState) {
      return openClassName;
    }

    return `${openClassName} open`;
  };

  const handleClick = e => {
    const classes = [
      'material-icons',
      'createbooks_form',
      'books_cread_icons_text',
      'books_text'
    ];

    let areClassesIncluded = classes.some(classValue =>
      e.target.classList.contains(classValue)
    );

    if (areClassesIncluded) {
      setClose(prev => !prev);
      return;
    }
  };

  return (
    <StyleContainer className='container'>
      <section className='author'>
        <div className='author-information'>
          {data ? (
            <>
              <p className='name'>
                <strong>
                  Welcome {data.name} {data.last_name}{' '}
                </strong>
              </p>
              <p>Email: {data.email}</p>
            </>
          ) : (
            ''
          )}
        </div>
      </section>
      <section className='books'>
        <div className={setOpenClass(close)} onClick={handleClick}>
          <Form>
            <header className='create_books_form_header'>
              <h1 className='form-description'>Create a Book</h1>
              <div className='close-icon'>
                <span className='close-material-icon'>
                  <i className='material-icons'>close</i>
                </span>
              </div>
            </header>
            <fieldset>
              <div className='form form-group'>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' />
              </div>
              <div className='form form-group'>
                <label htmlFor='description'>Description</label>
                <textarea name='description' id='' cols='5' rows='8'></textarea>
              </div>
              <div className='form form-group'>
                <label htmlFor='type'>Type</label>
                <input type='text' name='type' />
              </div>
              <div className='form-btn'>
                <StyledButton type='submit'>Post</StyledButton>
              </div>
            </fieldset>
          </Form>
        </div>
        <div className='books_cread_icons_text' onClick={handleClick}>
          <div className='books_add_icon'>
            <span className='icon'>
              <i className='material-icons'>add_circle</i>
            </span>
          </div>
          <div className='books_add_text'>
            <p className='books_text'>Create book</p>
          </div>
        </div>
        <Books />
      </section>
    </StyleContainer>
  );
}

export default WithLayout(Feed);
