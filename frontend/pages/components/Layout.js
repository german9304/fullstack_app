import styled from 'styled-components';
import Head from 'next/head';
import Nav from './Nav';

const StyledLayout = styled.div`
  --global-font: 'Quattrocento', serif;
  * {
    box-sizing: border-box;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .auth h1 {
    font-size: 1.5em;
    text-align: center;
  }
`;

function WithLayout(Page) {
  return () => (
    <StyledLayout className='container'>
      <Head>
        <title>Digital Library</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          href='https://fonts.googleapis.com/css?family=Fredoka+One|Lakki+Reddy|Quattrocento&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Nav />
      <main>
        <Page />
      </main>
    </StyledLayout>
  );
}

export default WithLayout;
