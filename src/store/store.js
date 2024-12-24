import axiosRequest from "@/untils/axiosRequest";
import { AwardIcon } from "lucide-react";
import { create } from "zustand";

export const useWeb = create((set,get) => ({
  data: [],
  dataCard: [],
  productData: [],
  productDataByid: [],
  dataBrands: [],
  products: [],
  category: {},
  getProd: async (request, id) => {
    try {
        set({products: []});
        let {data} = await axiosRequest(`/Product/get-products?${request}=${id}`);
        console.log(data);
        set({products: data.data.products});
    } catch (error) {
        console.error(error);
    }
},
getCatId: async (id) => {
  try {
      let {data} = await axiosRequest(`/Category/get-category-by-id?id=${id}`);
      set({category: data.data});
  } catch (error) {
      
  }
},
  getData: async () => {
    try {
      const { data } = await axiosRequest.get("/Category/get-categories");
      set({ data: data.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  getDataById: async (id) => {
    try {
      const { data } = await axiosRequest.get(
        `/Product/get-product-by-id?id=${id}`
      );
      set({ productDataByid: data.data });
      console.log(1);
    } catch (error) {
      console.error("Error fetching dataById:", error);
    }
  },
  getProducts: async () => {
    try {
      const { data } = await axiosRequest.get(
        "/Product/get-products?PageSize=10000"
      );
      set({ productData: data.data.products });
    } catch (error) {
      console.log("Error fetching Product:", error);
    }
  },
  getCard: async () => {
    try {
      const { data } = await axiosRequest.get("/Cart/get-products-from-cart");
      set({ dataCard: data.data });
    } catch (error) {
      console.log("Error fetching Card:", error);
    }
  },
  getBrands: async () => {
    try {
      const { data } = await axiosRequest.get("/Brand/get-brands");
      set({ dataBrands: data.data });
    } catch (error) {
      console.log("Error fetching Card:", error);
    }
  },
  AddCard: async (id) => {
    try {
      const { data } = await axiosRequest.post(
        `/Cart/add-product-to-cart?id=${id}`
      );
      set({ dataCard: data.data.products });
      get().getProducts()
    } catch (error) {
      console.log("Error fetching AddCard:", error);
    }
  },
  incresNum: async (id) => {
    try {
      const { data } = await axiosRequest.put(
        `/Cart/increase-product-in-cart?id=${id}`
      );
      get().getCard()
    } catch (error) {
      console.log("Error fetching AddCard:", error);
    }
  },
  decresNum: async (id) => {
    try {
      const { data } = await axiosRequest.put(
        `/Cart/reduce-product-in-cart?id=${id}`
      );
      get().getCard()
    } catch (error) {
      console.log("Error fetching AddCard:", error);
    }
  },
  deleteCard: async (id) => {
    try {
      const { data } = await axiosRequest.delete(
        `/Cart/delete-product-from-cart?id=${id}`
      );
      get().getCard()
    } catch (error) {
      console.log("Error fetching AddCard:", error);
    }
  },
  deleteAllCard: async (id) => {
    try {
      const { data } = await axiosRequest.delete(`/Cart/clear-cart`);
      set({ dataCard: data.data.products });
    } catch (error) {
      console.log("Error fetching AddCard:", error);
    }
  },
  minMax: {},
      getMinMax: async () => {
          try {
            let {data} = await axiosRequest(`/Product/get-products`);
            set({minMax: data.data.minMaxPrice})
          } catch (error) {
            console.error(error);
          }
      },
      getByPrice: async (min, max) => {
        try {
          let {data} = await axiosRequest(`/Product/get-products?MinPrice=${min}&MaxPrice=${max}`);
          set({products: data.data.products});
        } catch (error) {
          console.error(error);
        }
      },
      minMax: {},
      getMinMax: async () => {
          try {
            let {data} = await axiosRequest(`/Product/get-products`);
            set({minMax: data.data.minMaxPrice})
          } catch (error) {
            console.error(error);
          }
      },


}));
