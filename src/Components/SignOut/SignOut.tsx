import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../Redux/Slices/AuthSlice";
import { clearAllCouponsAction } from "../../Redux/Slices/CouponSlice";
import "./SignOut.css";

function SignOut(): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutAction());
    dispatch(clearAllCouponsAction());
    navigate("/sign-in");
  }, []);

  return (
    <div className="SignOut">

    </div>
  );
}

export default SignOut;
