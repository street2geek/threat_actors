import gql from "graphql-tag";
export const ALL_ACTORS_QUERY = gql`
  query {
    threatactors {
      slug
      name
    }
  }
`;

export const ACTOR_CONTENT_QUERY = gql`
  query ActorContentQuery($slug: String!) {
    threatactors(where: {slug_contains: $slug}) {
      summary
      actor
      severity
      orientation
      target
      capability
      operandi
      activity
    }
  }
`;
