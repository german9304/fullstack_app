import Author, { ME_QUERY } from '../pages/components/Author';
import pretty from 'pretty';

import { fakeUser } from './fakeUser';
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
            me: fakeUser()
          }
        }
      }
    ];
    const data = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Author />
      </MockedProvider>
    );

    await act(async () => {});
  });
});
