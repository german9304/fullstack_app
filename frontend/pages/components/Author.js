import gql from 'graphql-tag';

import { useQuery } from '@apollo/react-hooks';

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      author_id
      name
      last_name
      email
      password
      created
      age
      books {
        book_id
        title
        type
        description
        created
      }
    }
  }
`;

function useMe() {
  const { loading, error, data } = useQuery(ME_QUERY);

  if (error) {
    console.log('there is an error', error);
  }
  return {
    data,
    error
  };
}

export default useMe;
