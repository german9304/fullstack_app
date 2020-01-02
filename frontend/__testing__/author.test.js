import Author, { ME_QUERY } from '../pages/components/Author';
import pretty from 'pretty';

import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';

describe('author component', () => {
  test('should render with correct data', async () => {
    const mocks = [
      {
        request: {
          query: ME_QUERY
        },
        result: {
          data: {
            me: {
              author_id: '23344',
              name: 'testuser',
              last_name: 'userlastname',
              email: 'testuser@mail.com',
              password: 'password2344',
              created: new Date(),
              age: 32,
              books: [
                {
                  book_id: '2020202',
                  title: 'book title',
                  type: 'fiction',
                  description: 'nice book',
                  created: new Date()
                }
              ]
            }
          }
        }
      }
    ];
    const data = (
      <MockedProvider mocks={mocks} addTypename={false}>
        <Author />
      </MockedProvider>
    );

    await act(async () => {});
  });
});
