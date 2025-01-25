import { createSlice } from '@reduxjs/toolkit';
import { CouponModel } from '../../Models/CouponModel';


interface CouponState {
  allCoupons: CouponModel[];
  myCoupons: CouponModel[];
}

const initialState: CouponState = {
  allCoupons: [],
  myCoupons: [],
}

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    setAllCouponsAction(state, action) {
      state.allCoupons = action.payload;
    },

    setMyCouponsAction(state, action) {
      state.myCoupons = action.payload;
    },

    updateCouponInAllCouponsAction(state, action) {
      state.allCoupons = state.allCoupons.map((coupon) => {
        return coupon.uuid === action.payload.uuid ? action.payload : coupon
      });
    },

    addCouponToMyCouponsAction(state, action) {
      state.myCoupons.push(action.payload);
    },



    clearAllCouponsAction(state) {
      state.allCoupons = [];
      state.myCoupons = [];
    }
  }
});

export const { setAllCouponsAction, setMyCouponsAction, updateCouponInAllCouponsAction, addCouponToMyCouponsAction,clearAllCouponsAction } = couponSlice.actions;
export default couponSlice.reducer;