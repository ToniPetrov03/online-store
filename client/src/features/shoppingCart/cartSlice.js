const initialState = {
  items: [],
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case 'shoppingCart/Add': {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'shoppingCart/Remove': {
      return {
        ...state,
        items: state.items.filter((item) => item !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
}
