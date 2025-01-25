import axios, { AxiosRequestConfig } from "axios";
import { CouponModel } from "../Models/CouponModel";
import { LoginRequestModel, LoginResponseModel, RegisterRequestModel } from "../Models/UserModel";
import store from "../Redux/Store";
import globalUrlService from "./GlobalUrlService";

class WebApiService {
  private get headers(): AxiosRequestConfig {
    return { headers: { 'Authorization': store.getState().auth.token } };
  }

  public async registerApi(registerRequestModel: RegisterRequestModel): Promise<void> {
    console.log(registerRequestModel)
    await axios.post(globalUrlService.getBaseUrl() + "register", registerRequestModel)

  }

  public async loginApi(loginRequestModel: LoginRequestModel): Promise<LoginResponseModel> {
    const response = await axios.post(globalUrlService.getBaseUrl() + "sign-in", loginRequestModel);

    return response.data;
  }


  public async getAllCouponsApi(): Promise<CouponModel[]> {
    const response = await axios.get(globalUrlService.getBaseUrl() + "all-coupons", this.headers);

    const data: CouponModel[] = response.data;
    return data;
  }

  public async purchaseCouponApi(couponUuid: string): Promise<CouponModel> {
    const response = await axios.post(globalUrlService.getBaseUrl() + "buy/" + couponUuid, {}, this.headers);

    const data: CouponModel = response.data;
    return data;
  }


  public async getMyCouponsApi(): Promise<CouponModel[]> {
    const response = await axios.get(globalUrlService.getBaseUrl() + "get-all-customer-coupons", this.headers);

    const data: CouponModel[] = response.data;
    return data;
  }

  public async updateUserApi(registerRequestModel: RegisterRequestModel): Promise<void> {
    await axios.put(globalUrlService.getBaseUrl() + "edit-details", registerRequestModel, this.headers);

  }




}

const webApiService = new WebApiService();
export default webApiService;