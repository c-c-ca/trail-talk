import axios from 'axios';
import { FETCH_USER } from './types';
import history from '../history';

export const fetchUser = () => async dispatch => {
  const { data: user } = await axios.get('/api/current-user');

  if (user && !user.username) {
    // return axios.post('api/logout');
    // return history.push('/create-username');
  }

  dispatch({
    type: FETCH_USER,
    payload: user,
  });
};
