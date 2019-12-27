import styled from 'styled-components';
import Ul from './styles/ListStyles';

import Link from 'next/link';

const StyledNav = styled.nav`
  * {
    box-sizing: border-box;
  }
  display: flex;
  justify-content: space-between;
  border-bottom: solid 0.2em gray;
  padding: 1.2em;
  margin: 0;

  a {
    text-decoration: none;
    color: #111111;
    padding: 0.5em;
  }

  .user-auth a:hover {
    background-color: #dddddd;
    opacity: 0.8;
  }
  .user-auth ul {
    display: flex;
    font-family: 'Quattrocento', serif;
  }

  .user-auth li {
    /* padding: 1em; */
  }

  .user-auth a {
    /* box-shadow: 0 0 2px 1px rgba(0, 0, 0, 1); */
  }

  li:first-child {
    margin-right: 1em;
  }

  .app-name {
    display: flex;
    align-items: center;
    margin-right: 1em;
  }
  .app-name .app_title {
    margin: 0;
    padding: 0;
    font-family: 'Fredoka One', cursive;
    font-size: 1.3em;
  }

  /* .user-auth {
    border: solid 1px red;
  } */
`;

function Nav() {
  return (
    <StyledNav>
      <div className='app-name'>
        <Link href='/'>
          <a className='app_title'>
            <span>Digital Library</span>
          </a>
        </Link>
      </div>
      <div className='user-auth'>
        <Ul>
          <li id='signin'>
            <Link href='/signin'>
              <a>Sign in</a>
            </Link>
          </li>
          <li id='signup'>
            <Link href='/signup'>
              <a>Join Now</a>
            </Link>
          </li>
          {/* <li id='signout'>
            <a>Sign out</a>
          </li> */}
        </Ul>
      </div>
    </StyledNav>
  );
}

export default Nav;
