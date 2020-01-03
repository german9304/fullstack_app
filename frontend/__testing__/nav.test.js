import Nav from '../pages/components/Nav';
import pretty from 'pretty';

import { fakeUser } from './fakeUser';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { act } from 'react-dom/test-utils';
import { ME_QUERY } from '../pages/components/Author';

function mocks(meData) {
  return [
    {
      request: {
        query: ME_QUERY
      },
      result: {
        data: {
          me: meData
        }
      }
    }
  ];
}

describe('Nav component', () => {
  test('it should render without crashing', async () => {
    await act(async () => {});
    const { container } = render(
      <MockedProvider mocks={mocks(null)} addTypename={false}>
        <Nav />
      </MockedProvider>
    );

    await act(async () => {});
    expect(container.innerHTML).toBeTruthy();
  });

  test('should render the correct nav links, when user has not logged in', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks(null)} addTypename={false}>
        <Nav />
      </MockedProvider>
    );
    await act(async () => {});
    const navAnchors = container.querySelectorAll('.user-auth li a');

    const anchorTexts = ['Sign in', 'Join Now'];
    navAnchors.forEach((anchor, i) => {
      expect(anchor.textContent).toBe(anchorTexts[i]);
    });
  });

  test('should render the correct nav links, when user is logged in', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks(fakeUser())} addTypename={false}>
        <Nav />
      </MockedProvider>
    );
    await act(async () => {});
    const navAnchors = container.querySelectorAll('.user-auth li a');

    const anchorTexts = ['Sign out'];
    navAnchors.forEach((anchor, i) => {
      expect(anchor.textContent).toBe(anchorTexts[i]);
    });
  });
});
