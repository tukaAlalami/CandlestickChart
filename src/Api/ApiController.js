import axios from 'axios';
import {fetchData, fetchSuccess, fetchError} from '../Redux/Actions';

const getDataApi = (url) => (dispatch) => {
  dispatch(fetchData());
  return new Promise(() => {
    axios
      .get(url)
      .then((response) => {
        console.log('response',response);
        dispatch(fetchSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchError(error));
        console.log(error);
      });
  });
};

export default getDataApi;