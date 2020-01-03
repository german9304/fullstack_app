import Book from '../pages/components/Book';
import Books, { GET_BOOK_QUERY } from '../pages/components/Books';
import wait from 'waait';
import pretty from 'pretty';

import { books } from './fake.data';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';

describe('book component', () => {
  it('book should render with correct props', () => {
    const fakeData = {
      book_id: '12345',
      title: 'book title to test',
      description: 'this is a description to test the component',
      type: 'test type',
      created: '2010-10-10'
    };

    const { container } = render(<Book data={fakeData} />);
    const title = container.querySelector('.title'); // book title
    const description = container.querySelector('.book-meta .description'); // book description
    const type = container.querySelector('.book-meta .type-text');
    expect(title.textContent).toBe(fakeData.title);
    expect(description.textContent).toBe(fakeData.description);
    expect(type.textContent).toBe(fakeData.type);
  });

  it('Books should render with correct props and correct data from server', async () => {
    const mocks = [
      {
        request: {
          query: GET_BOOK_QUERY
        },
        result: {
          data: {
            books
          }
        }
      }
    ];
    await act(async () => {});
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Books />
      </MockedProvider>
    );

    await act(async () => {});

    const bookSections = container.querySelectorAll('.book');
    expect(bookSections.length).toBe(2);
  });
});
