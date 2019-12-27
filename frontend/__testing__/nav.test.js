import Nav from '../pages/components/Nav';
import pretty from 'pretty';

import { render } from '@testing-library/react';

describe('Nav component', () => {
  test('it should render without crashing', () => {
    const { container } = render(<Nav />);
    expect(container.innerHTML).toBeTruthy();
  });

  test('should render the correct nav links', () => {
    const { container } = render(<Nav />);
    const navAnchors = container.querySelectorAll('.user-auth li a');
    const anchorTexts = ['Sign in', 'Join Now'];
    navAnchors.forEach((anchor, i) => {
      expect(anchor.textContent).toBe(anchorTexts[i]);
    });
  });
});
