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
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setDietitians: (state, action) => {
      state.dietitians = action.payload;
      state.loading = false;
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
      state.loading = false;
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
