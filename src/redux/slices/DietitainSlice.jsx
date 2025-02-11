import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dietitians: [],
  selectedDietitian: null,
  plans: [],
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
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setDietitians: (state, action) => {
      state.dietitians = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedDietitian: (state, action) => {
      state.selectedDietitian = action.payload;
      state.loading = false;
      state.error = null;
    },
    setDietitianPlans: (state, action) => {
      state.plans = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateDietitianPlans: (state, action) => {
      state.plans = [...state.plans, ...action.payload];
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setSortBy,
  setSearchQuery,
  setDietitians,
  setSelectedDietitian,
  setDietitianPlans,
  updateDietitianPlans,
  setLoading,
  setError,
  clearError,
} = DietitianSlice.actions;

export default DietitianSlice.reducer;
