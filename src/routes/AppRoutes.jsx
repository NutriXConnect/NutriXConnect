import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";
import LandingPage from "../pages/Landing";
import HomePage from "../pages/Home";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ExplorePage from "../pages/Explore/ExplorePage";
import TrackPage from "../pages/Track/TrackPage";
import ProfilePage from "../pages/Profile";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<HomePage />} />}
          />
          <Route
            path="/explore"
            element={<PrivateRoute element={<ExplorePage />} />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<DashboardPage />} />}
          />
          <Route
            path="/track"
            element={<PrivateRoute element={<TrackPage />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfilePage />} />}
            // element={<ProfilePage />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
