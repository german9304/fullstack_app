import styled from 'styled-components';
import Ul from './styles/ListStyles';
import useMe from './Author';
import Link from 'next/link';
import gql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';

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
    cursor: pointer;
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

export const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

function Nav() {
  // Fetch current signed in user
  const currentUser = useMe();
  const [signOutMutation, { loading, data: signoutData, error }] = useMutation(
    SIGN_OUT_MUTATION
  );

  // If data exists display user
  const data = currentUser.data ? currentUser.data.me : null;
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
          {data ? (
            <li id='signout'>
              <a>Sign out</a>
            </li>
          ) : (
            <>
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
            </>
          )}
        </Ul>
      </div>
    </StyledNav>
  );
}

export default Nav;
