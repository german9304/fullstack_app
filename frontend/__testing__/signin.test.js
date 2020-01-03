import pretty from 'pretty';
import Signin from '../pages/Signin';

import { act } from 'react-dom/test-utils';
import { SIGNIN_MUTATION } from '../pages/Signin';
import { ME_QUERY } from '../pages/components/Author';
import { render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { fakeUser } from './fakeUser';

describe('Signing component', () => {
  it('mutation should contain correct data, when submitting form and inputs should have correct values', async () => {
    let isMutationCalled = false;
    const emailInput = 'german@mail.com';
    const passwordInput = 'password234';

    const mocks = [
      {
        request: {
          query: ME_QUERY
        },
        result: () => {
          return {
            data: {
              me: null
            }
          };
        }
      },
      {
        request: {
          query: SIGNIN_MUTATION,
          variables: {
            email: emailInput,
            password: passwordInput
          }
        },
        result: () => {
          isMutationCalled = true;
          return {
            data: {
              signin: fakeUser()
            }
          };
        }
      }
    ];

    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Signin />
      </MockedProvider>
    );

    await act(async () => {});

    const email = container.querySelector('.form input[name="email"]');
    const password = container.querySelector('.form input[name="password"]');
    const button = container.querySelector('.form-btn button');
    fireEvent.change(email, { target: { value: emailInput } });
    fireEvent.change(password, { target: { value: passwordInput } });
    fireEvent.submit(button);

    await act(async () => {});
    // Values contain correct value
    expect(email.value).toBe(emailInput);
    expect(password.value).toBe(passwordInput);
    expect(isMutationCalled).toBe(true);
  });
});
