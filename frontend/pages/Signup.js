/**
 * Implements signup authentication for user
 */

import styled from 'styled-components';
import gql from 'graphql-tag';
import FormStyles from './components/styles/FormStyles';
import WithLayout from './components/Layout';
import StyledButton from './components/styles/ButtonStyles';

import { useMutation } from '@apollo/react-hooks';
import { useInputValue } from '../lib/CustomHook';

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($author: AuthorInput!) {
    signup(author: $author) {
      author_id
      name
      email
      age
    }
  }
`;

const StyledAuthForm = styled.div``;
function Signup() {
  const [signupMutation, { loading, error, data }] = useMutation(
    SIGNUP_MUTATION
  );
  const FORM_FIELDS = [
    { field: 'name', handler: useInputValue('') },
    { field: 'email', handler: useInputValue('') },
    { field: 'last name', handler: useInputValue('') },
    { field: 'password', handler: useInputValue('') },
    { field: 'age', handler: useInputValue('') }
  ];

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (data) {
    console.log(JSON.stringify(data, null, '   '));
  }

  const setUpField = field => field.replace(/ /gi, '_');

  function handleSubmit(e) {
    e.preventDefault();
    // Goes through the FORM_FIELDS array and reduces it to an object
    const author = FORM_FIELDS.reduce((acc, { field, handler }) => {
      return { ...acc, [setUpField(field)]: handler.value };
    }, {});

    signupMutation({
      variables: {
        author
      }
    });
  }

  // Replaces empty character to '-'
  return (
    <StyledAuthForm className='auth signup-form'>
      <header>
        <h1>Sign up to digital libray</h1>
      </header>
      <FormStyles onSubmit={handleSubmit}>
        {FORM_FIELDS.map(({ field, handler }, i) => {
          let spaceRemoved = setUpField(field);
          return (
            <div key={`${field}${i}`} className='form form-formgroup'>
              <label htmlFor={spaceRemoved}>{spaceRemoved}</label>
              <input
                type='text'
                name={spaceRemoved}
                value={handler.value}
                onChange={handler.handleValue}
              />
            </div>
          );
        })}
        <div className='form-btn'>
          <StyledButton type='submit'>Join us</StyledButton>
        </div>
      </FormStyles>
    </StyledAuthForm>
  );
}

export default WithLayout(Signup);
