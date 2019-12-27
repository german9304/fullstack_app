// Default imports
import styled from 'styled-components';
import WithLayout from './components/Layout';
import Ul from './components/styles/ListStyles';

import { useState, createContext } from 'react';

const StyledApp = styled.div`
  margin-top: 1em;
  h1,
  h2 {
    font-family: var(--global-font);
    margin: 0;
    padding: 0;
  }

  header {
    margin-bottom: 1em;
  }

  .app_steps {
    font-family: var(--global-font);
    margin-bottom: 1em;
  }

  .app_steps_title {
    margin-bottom: 0.2em;
  }
  li {
    padding: 0;
    margin: 0;
  }
`;
function App(props) {
  return (
    <StyledApp>
      <header>
        <h1 className='app-title'>Welcome to Digital Libray</h1>
      </header>

      <section id='things' className='app_steps thingstodo'>
        <h2 className='app_steps_title'>Things to do:</h2>
        <Ul>
          <li>
            <span> - Save your favorite books</span>
          </li>
          <li>
            <span> - Organize your books based on their type</span>
          </li>
        </Ul>
      </section>

      <section id='start-section' className='app_steps start_section'>
        <h2 className='app_steps_title'>How to start?</h2>
        <Ul>
          <li>
            <span> - Please create an account</span>
          </li>
        </Ul>
      </section>
    </StyledApp>
  );
}

export default WithLayout(App);
