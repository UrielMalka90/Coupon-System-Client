import { Route, Routes } from "react-router-dom";
import App from "../../App";
import MyCoupons from "../../Pages/MyCoupons/MyCoupons";
import NotFound from "../../Pages/NotFound/NotFound";
import Store from "../../Pages/Store/Store";
import ViewCoupon from "../../Pages/ViewCoupon/ViewCoupon";
import SignInForm from "../SignInForm/SignInForm";
import SignOut from "../SignOut/SignOut";
import UpdateUser from "../UpdateUser/UpdateUser";
import "./Routing.css";

function Routing(): JSX.Element {

  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<SignInForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignInForm />} />

        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/store" element={<Store />} />
        <Route path="/my-coupons" element={<MyCoupons />} />
        <Route path="/my-coupons/:uuid" element={<ViewCoupon />} />
        <Route path="/update-details" element={<UpdateUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Routing;
