import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";
import { LoginRequestModel, RegisterRequestModel } from "../../Models/UserModel";
import { loginAction } from "../../Redux/Slices/AuthSlice";
import notificationService, { ErrorDetails } from "../../Services/NotificationService";
import webApiService from "../../Services/WebApiService";
import "./SignInForm.css";

function SignInForm(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const timer = () => {
    setTimeout(() => {
      navigate("/sign-out");
    }, 1000 * 60 * 60);
  }

  const schema = zod.object({
    username: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().min(4, { message: "Password must be at least 4 characters long" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequestModel | RegisterRequestModel>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginRequestModel | RegisterRequestModel, isSignIn: boolean) => {
    try {
      if (isSignIn) {
        // SignIn logic
        const res = webApiService.loginApi(data as LoginRequestModel);
        notificationService.successPlainText("Logged in successfully");
        dispatch(loginAction(res));
        timer();
        navigate("/store");
      } else {
        // SignUp logic
        webApiService.registerApi(data as RegisterRequestModel);
        notificationService.successPlainText("Registered successfully");
      }
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError<ErrorDetails>(error)) {
        console.log("The error is: " + error);
        notificationService.errorAxiosApiCall(error);
      } else {
        console.error('Unknown error:' + error);
        notificationService.errorPlainText('An unknown error occurred');
      }
    }
  };

  return (
    <div className="SignInForm">
      <form className="SignInForm">
        <h2>SignIn | SignUp Form</h2>
        {/* Username (Email) */}
        <label htmlFor="username">Username (Email):</label>
        <input {...register("username")} id="username" name="username" type="email" placeholder="Email here" />
        <span className="form-error-message"> {errors.username?.message}</span>

        {/* Password */}
        <label htmlFor="password">Password:</label>
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
          <button type="button" onClick={handleSubmit((data) => onSubmit(data, true))} disabled={isSubmitting}>
            SignIn
          </button>
          <button type="button" onClick={handleSubmit((data) => onSubmit(data, false))} disabled={isSubmitting}>
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;