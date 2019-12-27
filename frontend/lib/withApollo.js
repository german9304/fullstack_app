import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

function GraphQLUrl() {
  // If window is not defined, it is fetch from the server
  if (typeof window === 'undefined') {
    return 'http://backend:5000/';
  }
  return 'http://localhost:5000/';
}

function client({ headers, initialState }) {
  return new ApolloClient({
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      });
    },
    uri: GraphQLUrl(),
    cache: new InMemoryCache().restore(initialState || {})
  });
}
export default withApollo(client);
