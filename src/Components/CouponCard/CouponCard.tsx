import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CouponModel } from "../../Models/CouponModel";
import { addCouponToMyCouponsAction, updateCouponInAllCouponsAction } from "../../Redux/Slices/CouponSlice";
import notificationService from "../../Services/NotificationService";
import webApiService from "../../Services/WebApiService";
import "./CouponCard.css";

interface CouponCardProps {
  coupon: CouponModel;
  isPurchasable: boolean;
}

function CouponCard(props: CouponCardProps): JSX.Element {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePurchase(): void {
    webApiService.purchaseCouponApi(props.coupon.uuid).then((coupon) => {
      dispatch(updateCouponInAllCouponsAction(coupon))
      dispatch(addCouponToMyCouponsAction(coupon))
      notificationService.successPlainText("Coupon purchased successfully");
    }).catch((error) => {
      notificationService.errorAxiosApiCall(error);
    });
  }

  function handleView(): void {
    navigate("/my-coupons/" + props.coupon.uuid);
  }

  function getCurrentDatePlusSevenDays(): Date {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    return currentDate;
  }


    return (
      <>
        {
          new Date(props.coupon.endDate) < getCurrentDatePlusSevenDays() ?
            <div className="CouponCard red-border">
              <img src={props.coupon.image} alt="coupon image" />
              <p>Title: {props.coupon.title}</p>
              <p>Description: {props.coupon.description}</p>
              <p>Category: {props.coupon.category}</p>
              <p>Price: {props.coupon.price}</p>
              <p>Start Date: {moment(props.coupon.startDate).format("DD/MM/YYYY")}</p>
              <p>End Date: {moment(props.coupon.endDate).format("DD/MM/YYYY")}</p>
              {props.isPurchasable && <p>Amount: {props.coupon.amount}</p>}
              {
                props.isPurchasable ?
                  <button onClick={handlePurchase}>Purchase</button>
                  :
                  <button onClick={handleView}>View</button>
              }
            </div>

            :

            <div className="CouponCard">
              <img src={props.coupon.image} alt="coupon image" />
              <p>Title: {props.coupon.title}</p>
              <p>Description: {props.coupon.description}</p>
              <p>Category: {props.coupon.category}</p>
              <p>Price: {props.coupon.price}</p>
              <p>Start Date: {moment(props.coupon.startDate).format("DD/MM/YYYY")}</p>
              <p>End Date: {moment(props.coupon.endDate).format("DD/MM/YYYY")}</p>
              {props.isPurchasable && <p>Amount: {props.coupon.amount}</p>}
              {
                props.isPurchasable ?
                  <button onClick={handlePurchase}>Purchase</button>
                  :
                  <button onClick={handleView}>View</button>
              }
            </div>
        }
      </>
    );
  }

  export default CouponCard;