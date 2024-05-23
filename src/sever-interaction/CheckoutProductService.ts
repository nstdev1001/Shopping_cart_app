import { API_URL } from "../AppAPI";
import ApiService from "../services/ApiService";

const CheckoutProductService = {
  async postCheckoutProduct(data: any) {
    try {
      const response = await ApiService.postRequest(API_URL + "checkout", data);

      return response.data;
    } catch (error) {
      console.error("Error in postproduct", error);
      throw error;
    }
  },
};

export default CheckoutProductService;
