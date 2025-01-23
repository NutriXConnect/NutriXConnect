import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dietitians: [],
  selectedDietitian: null,
  sortBy: "rating",
  searchQuery: "",
  loading: false,
  error: null,
};

const DietitianSlice = createSlice({
  name: "dietitians",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      // Sort dietitians based on criteria
      state.dietitians = state.dietitians.sort((a, b) => {
        switch (action.payload) {
          case "rating":
            return b.rating - a.rating;
          case "price":
            return a.monthlyPrice - b.monthlyPrice;
          case "experience":
            return b.experience - a.experience;
          default:
            return 0;
        }
      });
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setDietitians: (state, action) => {
      state.dietitians = action.payload;
    },
    setSelectedDietitian: (state, action) => {
      state.selectedDietitian = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSortBy,
  setSearchQuery,
  setDietitians,
  setSelectedDietitian,
  setLoading,
  setError,
} = DietitianSlice.actions;

export default DietitianSlice.reducer;
