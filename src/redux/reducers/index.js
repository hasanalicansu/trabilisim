import {combineReducers} from "redux";

import asDataReducer from "./AsDataReducer" 
import bsDataReducer from "./BsDataReducer" 


export default combineReducers({
   
   asDataResponse:asDataReducer,
   bsDataResponse:bsDataReducer
  
});