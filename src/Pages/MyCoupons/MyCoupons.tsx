import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CouponCard from "../../Components/CouponCard/CouponCard";
import { CouponModel } from "../../Models/CouponModel";
import { setMyCouponsAction } from "../../Redux/Slices/CouponSlice";
import store from "../../Redux/Store";
import notificationService from "../../Services/NotificationService";
import webApiService from "../../Services/WebApiService";
import "./MyCoupons.css";

function MyCoupons(): JSX.Element {
  const [myCoupons, setMyCoupons] = useState<CouponModel[]>(store.getState().coupon.myCoupons);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);


  const dispatch = useDispatch();

  useEffect(() => {
    webApiService.getMyCouponsApi().then((coupons) => {
      if (coupons.length !== 0) {
        setMyCoupons(coupons)
        dispatch(setMyCouponsAction(coupons))
        // notificationService.successPlainText("My Coupons loaded successfully");
      }
    }
    ).catch((error) => {
      notificationService.errorAxiosApiCall(error);
    });

  }, []);

  function handleFilterChange(currentTitle: string, currentPrice: number) {
    let filteredCoupons: CouponModel[] = store.getState().coupon.allCoupons;

    if (currentTitle !== "") {
      filteredCoupons = filteredCoupons.filter((c) => {
        return c.title.toLowerCase().startsWith(currentTitle.toLowerCase());
      })
    }

    if (currentPrice !== 0) {
      filteredCoupons = filteredCoupons.filter((c) => {
        return c.price <= currentPrice;
      })
    }

    setMyCoupons(filteredCoupons);
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>): void {
    const currentTitle: string = e.target.value;
    setTitle(currentTitle);
    handleFilterChange(currentTitle, price);
  }

  function handlePriceChange(e: ChangeEvent<HTMLInputElement>): void {
    const currentPrice: number = Number(e.target.value);
    setPrice(currentPrice);
    handleFilterChange(title, currentPrice);

  }


  return (
    <>
      <div className="search-ui">
        <div className="search-ui-item">
          <label htmlFor="title">Filter by title</label>
          <input type="text" id="title" name="title" placeholder="Title here"
            value={title} onChange={(e) => handleTitleChange(e)} />
        </div>
        <div className="search-ui-item">
          <label htmlFor="price">Filter by Price (Under & Below)</label>
          <input type="number" id="price" name="price" placeholder="Price here"
            min={0} value={price} onChange={(e) => handlePriceChange(e)} />
        </div>
      </div>

      <div className="MyCoupons">
        {myCoupons.length > 0
          ?
          myCoupons.map((c) => {
            return <CouponCard key={c.uuid} coupon={c} isPurchasable={false} />
          })
          :
          "no coupons to show yet"}
      </div>
    </>
  );
}


export default MyCoupons;
