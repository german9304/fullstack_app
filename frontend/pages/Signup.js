/**
 * Implements signup authentication for user
 */

import styled from 'styled-components';
import gql from 'graphql-tag';
import FormStyles from './components/styles/FormStyles';
import WithLayout from './components/Layout';
import StyledButton from './components/styles/ButtonStyles';
import Me from './components/Author';

import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
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

  const router = useRouter();

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
    console.log(JSON.stringify(error, null, '  '));
    error.graphQLErrors.map(({ message }, i) => {
      console.log(`graphql errors here c${message}`);
    });
    return <p>there is an error</p>;
  }

  if (data) {
    if (router) {
      router.push('/books');
    }
  }

  const setUpField = field => field.replace(/ /gi, '_');

  function handleSubmit(e) {
    e.preventDefault();
    // Goes through the FORM_FIELDS array and reduces it to an object
    const author = FORM_FIELDS.reduce((acc, { field, handler }) => {
      const setUpValue = () => {
        if (field === 'age') {
          return Number(handler.value);
        }
        return handler.value;
      };
      return { ...acc, [setUpField(field)]: setUpValue() };
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
              <label htmlFor={spaceRemoved}>{field}</label>
              <input
                autoComplete='none'
                type={field === 'password' ? field : 'text'}
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
