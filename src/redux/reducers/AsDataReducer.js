import {GET_AS_DATA,
  
  } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_AS_DATA:
      return {loading:true, getAsData: action.payload};
    default:
      return state;
  }
};