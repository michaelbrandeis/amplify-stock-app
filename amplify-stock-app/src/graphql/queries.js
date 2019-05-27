// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPortfolio = `query GetPortfolio($id: ID!) {
  getPortfolio(id: $id) {
    id
    name
    positions {
      items {
        id
        symbol
      }
      nextToken
    }
  }
}
`;
export const listPortfolios = `query ListPortfolios(
  $filter: ModelPortfolioFilterInput
  $limit: Int
  $nextToken: String
) {
  listPortfolios(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      positions {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPosition = `query GetPosition($id: ID!) {
  getPosition(id: $id) {
    id
    symbol
    portfolio {
      id
      name
      positions {
        nextToken
      }
    }
  }
}
`;
export const listPositions = `query ListPositions(
  $filter: ModelPositionFilterInput
  $limit: Int
  $nextToken: String
) {
  listPositions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      symbol
      portfolio {
        id
        name
      }
    }
    nextToken
  }
}
`;
