import { createSlice } from "@reduxjs/toolkit";

const getBasketFromStorage = () => {
  const basket = localStorage.getItem("basket");
  return basket ? JSON.parse(basket) : [];
};

const saveBasketToStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

const initialState = {
  products: getBasketFromStorage(),
  drawer: false,
  totalAmount: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const product = action.payload;

      const existingProduct = state.products.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity || 1;
      } else {
        state.products.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }

      saveBasketToStorage(state.products);
    },

    removeFromBasket: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload,
      );

      saveBasketToStorage(state.products);
    },

    clearBasket: (state) => {
      state.products = [];
      state.totalAmount = 0;
      saveBasketToStorage([]);
    },

    setDrawer: (state, action) => {
      state.drawer = action.payload;
    },

    calculateBasket: (state) => {
      state.totalAmount = state.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      );
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  clearBasket,
  setDrawer,
  calculateBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
