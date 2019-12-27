import App from 'next/app';
import withApollo from '../lib/withApollo';

import { ApolloProvider } from '@apollo/react-hooks';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default withApollo(MyApp);
