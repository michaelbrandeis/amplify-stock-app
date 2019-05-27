// eslint-disable
// this is an auto generated file. This will be overwritten

export const createPortfolio = `mutation CreatePortfolio($input: CreatePortfolioInput!) {
  createPortfolio(input: $input) {
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
export const updatePortfolio = `mutation UpdatePortfolio($input: UpdatePortfolioInput!) {
  updatePortfolio(input: $input) {
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
export const deletePortfolio = `mutation DeletePortfolio($input: DeletePortfolioInput!) {
  deletePortfolio(input: $input) {
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
export const createPosition = `mutation CreatePosition($input: CreatePositionInput!) {
  createPosition(input: $input) {
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
export const updatePosition = `mutation UpdatePosition($input: UpdatePositionInput!) {
  updatePosition(input: $input) {
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
export const deletePosition = `mutation DeletePosition($input: DeletePositionInput!) {
  deletePosition(input: $input) {
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
