import { combineReducers } from '@reduxjs/toolkit';
import socialMediaScraping from './socialMediaScrapingSlice';

const reducer = combineReducers({
  socialMediaScraping,
});

export default reducer;
