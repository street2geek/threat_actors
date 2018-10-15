import gql from 'graphql-tag'
export const ALL_ACTORS_QUERY = gql`
 query {
    threatactors {
      slug
      name
    }
  }
`;