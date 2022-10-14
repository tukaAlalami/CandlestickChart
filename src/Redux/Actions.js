import ACTION_TYPES from './ActionTypes.js';

export const fetchData = () => ({
  type: ACTION_TYPES.FETCH_DATA_PENDING,
});

export const fetchSuccess = (data) => ({
  type: ACTION_TYPES.FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchError = (error) => ({
  type: ACTION_TYPES.FETCH_DATA_ERROR,
  payload: error,
});