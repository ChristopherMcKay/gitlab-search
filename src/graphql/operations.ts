import { gql } from '@apollo/client';

export const FETCH_PROJECTS = gql`
  query ($searchTerm: String!, $first: Int, $last: Int, $after: String!, $before: String!) {
    projects(search: $searchTerm, first: $first, last: $last, after: $after, before: $before, sort: "name_asc") {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        name
        description
        id
        webUrl
        createdAt
        archived
      }
    }
  }
`;