import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  totalItems: 1,
  pageSize: 6,
};

const PaginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.currentPage = action.payload.currentPage;
      state.totalItems = action.payload.totalItems;
      state.pageSize = action.payload.pageSize;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.totalItems = 1;
      state.pageSize = 6;
    },
  },
});

export const {
  setPagination,
  setCurrentPage,
  setTotalItems,
  setPageSize,
  resetPagination,
} = PaginationSlice.actions;

export default PaginationSlice.reducer;
