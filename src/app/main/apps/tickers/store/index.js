import { combineReducers } from '@reduxjs/toolkit';
import tickers from './tickersSlice';
import keywordsCloud from './keywordsCloudSlice';

const reducer = combineReducers({
  tickers,
  keywordsCloud,
});

export default reducer;
