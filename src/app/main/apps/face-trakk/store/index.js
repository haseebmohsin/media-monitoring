import { combineReducers } from '@reduxjs/toolkit';
import faceTrakk from './faceTrakkSlice';

const reducer = combineReducers({
  faceTrakk,
});

export default reducer;
