import {GET_BS_DATA, GET_DATA} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BS_DATA:
      return {...state, loading: true, getBsData: action.payload};

    default:
      return state;
  }
};
