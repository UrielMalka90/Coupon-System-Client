import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import store from "../../Redux/Store";
import "./Header.css";

function Header(): JSX.Element {
  const [decodedToken, setDecodedToken] = useState(store.getState().auth.decodedToken);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setDecodedToken(store.getState().auth.decodedToken);
    });
    
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <div className="Header">
      <p>Hello {decodedToken.username}</p>
      {
        decodedToken.username === "guest" ?
          <div>
            <button onClick={() => navigate("/sign-in")}>login</button>
            <button onClick={() => navigate("/sign-up")}>register</button>
          </div>
          :
          <div>
            <NavLink to="/sign-out">Logout</NavLink>
            <NavLink to="/store">Store</NavLink>
            <NavLink to="/my-coupons">My Coupons</NavLink>
            <NavLink to="/update-details">Edit Details</NavLink>
          </div>
      }
    </div>
  );
}

export default Header;
