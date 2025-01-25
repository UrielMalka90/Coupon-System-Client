import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";
import { RegisterRequestModel } from "../../Models/UserModel";
import store from "../../Redux/Store";
import notificationService from "../../Services/NotificationService";
import webApiService from "../../Services/WebApiService";
import "./UpdateUser.css";

function UpdateUser(): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [decodedToken, setDecodedToken] = useState(store.getState().auth.decodedToken);

  const schema = zod.object({
    username: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().min(4, { message: "Password must be at least 4 characters long" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequestModel>({
    mode: "onSubmit",
    defaultValues: { username: decodedToken.username, password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterRequestModel) => {
    webApiService.updateUserApi(data).then((response) => {
      notificationService.successPlainText("User updated successfully");
      navigate("/sign-out");
    }).catch((error) => {
      notificationService.errorAxiosApiCall(error);
    });
  };

  return (
    <div className="SignInForm">
      <form className="SignInForm">
        <h2>Update Form</h2>
        {/* Username (Email) */}
        <label htmlFor="username">Username (Email):</label>
        <input {...register("username")} id="username" name="username" type="email" placeholder="Email here" />
        <span className="form-error-message"> {errors.username?.message}</span>

        {/* Password */}
        <label htmlFor="password">New Password:</label>
        <input
          {...register("password")}
          id="password"
          name="password"
          type="password"
          placeholder="Password here"
        />
        <span className="form-error-message"> {errors.password?.message}</span>

        {/* Buttons */}
        <div className="SignInFormButtons">
          <button type="button" onClick={() => navigate("/store")}>
            Cancel</button>
          <button type="button" onClick={handleSubmit((data) => onSubmit(data))} disabled={isSubmitting}>
            Update Now
          </button>
        </div>
      </form>
    </div>
  );
}


export default UpdateUser;
