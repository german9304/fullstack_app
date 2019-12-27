import styled from 'styled-components';
import WithLayout from './components/Layout';
import FormStyles from './components/styles/FormStyles';
import StyledButton from './components/styles/ButtonStyles';
import gql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { useInputValue } from '../lib/CustomHook';

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      author_id
      name
      email
      password
      created
    }
  }
`;

function Signin() {
  const [signinMutation, { data, error, loading }] = useMutation(
    SIGNIN_MUTATION
  );
  const email = useInputValue('');
  const password = useInputValue('');

  if (loading) return <p>loading...</p>;
  if (error) {
    return <p>error</p>;
  }

  function handleSubmit(e) {
    e.preventDefault();
    signinMutation({
      variables: {
        email: email.value,
        password: password.value
      }
    });
  }
  return (
    <div className='auth signin'>
      <h1>Welcome Back, Please Sign in</h1>
      <FormStyles onSubmit={handleSubmit}>
        <div className='form form-formgroup'>
          <label htmlFor='email'> Email</label>
          <input
            type='text'
            name='email'
            value={email.value}
            onChange={email.handleValue}
          />
        </div>
        <div className='form form-group'>
          <label htmlFor='password'> Password</label>
          <input
            type='password'
            name='password'
            value={password.value}
            onChange={password.handleValue}
          />
        </div>
        <div className='form-btn'>
          <StyledButton type='submit'>Sign in</StyledButton>
        </div>
      </FormStyles>
    </div>
  );
}

export default WithLayout(Signin);
