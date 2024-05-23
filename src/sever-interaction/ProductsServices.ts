import { API_URL } from "../AppAPI";
import ApiService from "../services/ApiService";

const ProductsServices = {
  async getProducts() {
    try {
      const response = await ApiService.getRequest(`${API_URL}products`);

      return response.data;
    } catch (error) {
      console.error("Error in getProducts", error);
      throw error;
    }
  },
  async getProduct(id: string) {
    try {
      const response = await ApiService.getRequest(`${API_URL}products/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error in getProduct", error);
      throw error;
    }
  },
};

export default ProductsServices;
