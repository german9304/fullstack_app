import styled from 'styled-components';
import useMe from './components/Author';
import Books from './components/Books';
import WithLayout from './components/Layout';

import { useRouter } from 'next/router';

const StyleContainer = styled.div`
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(2, 500px);

  .author {
    display: flex;
    justify-content: center;
  }

  .author .author-information .name {
    font-family: 'Fredoka One', cursive;
  }
  .author p {
    margin: 0.4em 0;
    padding: 0;
    font-family: var(--global-font);
  }
`;

function Feed() {
  const currentUser = useMe();
  const data = currentUser.data ? currentUser.data.me : null;

  return (
    <StyleContainer className='container'>
      <div className='author'>
        <div className='author-information'>
          {data ? (
            <>
              <p className='name'>
                <strong>
                  Welcome {data.name} {data.last_name}{' '}
                </strong>
              </p>
              <p>Email: {data.email}</p>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <Books />
    </StyleContainer>
  );
}

export default WithLayout(Feed);
