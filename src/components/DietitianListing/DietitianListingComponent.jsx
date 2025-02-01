import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DietitianCard from "../DietitianCard/DietitianCard";
import {
  clearError,
  setSearchQuery,
  setSortBy,
} from "../../redux/slices/DietitainSlice";
import PaginationComponent from "../Common/Pagination/PaginationComponent";
import { getListings } from "../../middleware/dietitianMiddleware";
import { resetPagination } from "../../redux/slices/PaginationSlice";
import LoadingOverlay from "../Common/LoadingOverlay";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../Common/Error";
import { signout } from "../../middleware/authMiddleWare";

const DietitianListingComponent = () => {
  const { dietitians, sortBy, loading, error } = useSelector(
    (state) => state.dietitians
  );

  const { currentPage, totalItems, pageSize } = useSelector(
    (state) => state.pagination
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListings(currentPage, pageSize, sortBy));

    return () => {
      dispatch(resetPagination());
    };
  }, [currentPage, pageSize, sortBy]);

  useEffect(() => {
    if (error?.statusCode === 401) {
      const timer = setTimeout(() => {
        dispatch(signout());
        clearError();
        navigate("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  if (loading) {
    return <LoadingOverlay />;
  } else {
    if (dietitians.length > 0) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Dietitians
            </h2>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
              <select
                className="border rounded-lg px-3 py-2"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="experience">Sort by Experience</option>
              </select>
              {/* <input
            type="search"
            placeholder="Search dietitians..."
            className="border rounded-lg px-3 py-2"
            value={searchQuery}
            onChange={handleSearchChange}
          /> */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dietitians.map((dietitian) => (
              <DietitianCard key={dietitian._id} dietitian={dietitian} />
            ))}
          </div>
          {/* Pagination Component */}
          <PaginationComponent
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
          />
        </div>
      );
    } else {
      if (error) {
        let message = `${error.statusCode}: ${error.message}.`;
        if (error.statusCode === 401) {
          message += " Redirecting to login page";
        }
        return <ErrorComponent message={message} />;
      }
    }
  }
};

export default DietitianListingComponent;
