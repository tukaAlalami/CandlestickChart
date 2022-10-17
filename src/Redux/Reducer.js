import ACTION_TYPES from './ActionTypes';

const initialState = {
  loading: false,
  data: '',
  error: null,
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_DATA_PENDING:
      return {
        ...state,
        loading: true,
        data: '',
        error: null,
      };
    case ACTION_TYPES.FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };
    case ACTION_TYPES.FETCH_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        data : ''
      };

    default:
      return state;
  }
};

export default apiReducer;