import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CouponCard from "../../Components/CouponCard/CouponCard";
import { CouponModel } from "../../Models/CouponModel";
import { setAllCouponsAction } from "../../Redux/Slices/CouponSlice";
import store from "../../Redux/Store";
import notificationService from "../../Services/NotificationService";
import webApiService from "../../Services/WebApiService";
import "./Store.css";

function Store(): JSX.Element {
  const [allCoupons, setAllCoupons] = useState<CouponModel[]>(store.getState().coupon.allCoupons);
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setAllCoupons(store.getState().coupon.allCoupons);
    });

    if (allCoupons.length === 0) {
      webApiService.getAllCouponsApi().then((coupons) => {
        if (coupons.length > 0) {
          setAllCoupons(coupons);
          dispatch(setAllCouponsAction(coupons))
          notificationService.successPlainText("Coupons loaded successfully");
        }
      }
      ).catch((error) => {
        notificationService.errorAxiosApiCall(error);
      });
    }

    return () => {
      unsubscribe();
    }
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

    setAllCoupons(filteredCoupons);
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
      <div className="Store">
        {allCoupons.length > 0
          ?
          allCoupons.map((c) => {
            return <CouponCard key={c.uuid} coupon={c} isPurchasable={true} />
          })
          :
          "no coupons to show yet"}
      </div>
    </>
  );
}

export default Store;
