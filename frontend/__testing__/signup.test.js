import pretty from 'pretty';
import Signup, { SIGNUP_MUTATION } from '../pages/Signup';

import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

describe('Signup component', () => {
  test('should render withour crashing', async () => {
    const authorInput = {
      name: 'testuser',
      email: 'testuser@mail.com',
      last_name: 'testuserlastname',
      password: 'user123456',
      age: '45'
    };

    const mocks = [
      {
        request: {
          query: SIGNUP_MUTATION,
          variables: {
            author: authorInput
          }
        },
        result: () => {
          const { email, name, password, last_name, age } = authorInput;
          return {
            data: {
              signup: {
                author_id: '333',
                email,
                name,
                password,
                last_name,
                age
              }
            }
          };
        }
      }
    ];

    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Signup />
      </MockedProvider>
    );

    await act(async () => {});
    const formInputs = container.querySelectorAll(
      'form div[class~="form-formgroup"] input'
    );

    const button = container.querySelector('form .form-btn button');
    formInputs.forEach(input => {
      fireEvent.change(input, { target: { value: authorInput[input.name] } });
    });

    fireEvent.submit(button);
    await act(async () => {});
    formInputs.forEach(input => {
      expect(input.value).toBe(authorInput[input.name]);
    });
  });
});
