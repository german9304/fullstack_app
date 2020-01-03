import styled from 'styled-components';
import WithLayout from './components/Layout';
import FormStyles from './components/styles/FormStyles';
import StyledButton from './components/styles/ButtonStyles';
import gql from 'graphql-tag';
import { ME_QUERY } from './components/Author';
import { useRouter } from 'next/router';

import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { useInputValue } from '../lib/CustomHook';

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      author_id
      name
      last_name
      email
      password
      created
      age
      books {
        book_id
        title
        type
        description
        created
      }
    }
  }
`;

function Signin() {
  const router = useRouter();
  const [signinMutation, mutationData] = useMutation(SIGNIN_MUTATION, {
    update(cache, data) {
      const currentUser = cache.readQuery({ query: ME_QUERY });
      cache.writeQuery({
        query: ME_QUERY,
        data: {
          me: { ...currentUser.me, ...data.data.signin }
        }
      });
    }
  });
  const email = useInputValue('');
  const password = useInputValue('');

  if (mutationData.loading) return <p>loading...</p>;
  if (mutationData.error) {
    return <p>error</p>;
  }

  if (mutationData.data) {
    if (router) {
      router.push('/feed');
    }
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
