import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CouponModel } from "../../Models/CouponModel";
import { setMyCouponsAction } from "../../Redux/Slices/CouponSlice";
import store from "../../Redux/Store";
import notificationService from "../../Services/NotificationService";
import webApiService from "../../Services/WebApiService";
import "./ViewCoupon.css";

function ViewCoupon(): JSX.Element {
  const { uuid } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [coupon, setCoupon] = useState<CouponModel | undefined>(store.getState().coupon.myCoupons.find((c) => c.uuid === uuid));

  useEffect(() => {
    if (coupon === undefined) {
      webApiService.getMyCouponsApi().then((coupons) => {
        if (coupons.length !== 0) {
          dispatch(setMyCouponsAction(coupons))
          setCoupon(coupons.find((c) => c.uuid === uuid));
        }
      }
      ).catch((error) => {
        notificationService.errorAxiosApiCall(error);
      });
    }
  }, []);



  return (
    <div className="ViewCoupon">
      {
        coupon !== undefined ?
          <>
            <img src={coupon.image} alt="coupon image" />
            <p>Title: {coupon.title}</p>
            <p>Description: {coupon.description}</p>
            <p>Category: {coupon.category}</p>
            <p>Price: {coupon.price}</p>
            <p>Start Date: {moment(coupon.startDate).format("DD/MM/YYYY")}</p>
            <p>End Date: {moment(coupon.endDate).format("DD/MM/YYYY")}</p>
          </>
          :
          "no coupon to show"
      }
      <button onClick={() => navigate("/my-coupons")}>Back</button>
    </div>
  );
}

export default ViewCoupon;
