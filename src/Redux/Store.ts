import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './Slices/AuthSlice';
import couponReducer from './Slices/CouponSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  coupon: couponReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;