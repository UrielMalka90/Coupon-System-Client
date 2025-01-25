import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface ErrorDetails {
  title: string;
  detail: string;
}


class NotificationService {
  public successPlainText(message: string): void {
    toast.success(message);
  }

  public warnPlainText(message: string): void {
    toast.warn(message);
  }

  public errorPlainText(message: string): void {
    toast.error(message);
  }

  public errorAxiosApiCall(error: AxiosError<ErrorDetails>): void {
    const errorMessage = error?.response?.data?.detail || "An error occurred";
    this.errorPlainText(errorMessage);
  }

}

const notificationService = new NotificationService();
export default notificationService;
