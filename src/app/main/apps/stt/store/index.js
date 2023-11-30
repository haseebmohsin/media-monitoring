import { combineReducers } from '@reduxjs/toolkit';
import sttData from './sttSlice';

const reducer = combineReducers({
  sttData,
});

export default reducer;
