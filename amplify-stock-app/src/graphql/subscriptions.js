// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreatePortfolio = `subscription OnCreatePortfolio {
  onCreatePortfolio {
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
export const onUpdatePortfolio = `subscription OnUpdatePortfolio {
  onUpdatePortfolio {
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
export const onDeletePortfolio = `subscription OnDeletePortfolio {
  onDeletePortfolio {
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
export const onCreatePosition = `subscription OnCreatePosition {
  onCreatePosition {
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
export const onUpdatePosition = `subscription OnUpdatePosition {
  onUpdatePosition {
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
export const onDeletePosition = `subscription OnDeletePosition {
  onDeletePosition {
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
