import React, { useEffect, useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../../middleware/userMiddleWare";

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const user =
    typeof useSelector((state) => state.auth.user) == "string"
      ? JSON.parse(useSelector((state) => state.auth.user))
      : useSelector((state) => state.auth.user);

  const menuItems = [
    { title: "Home", path: "/home" },
    { title: "Explore", path: "/explore" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "Track", path: "/track" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/";
  };

  const getNavLinkClasses = (path) => {
    return `relative py-2 text-gray-600 transition-colors
      ${isActive(path) ? "text-blue-600 font-medium" : "hover:text-blue-600"}
      group
    `;
  };

  const getActiveIndicator = (path) => {
    return (
      <div
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-200
          ${isActive(path) ? "scale-x-100" : "scale-x-0"}
          group-hover:scale-x-100
        `}
      />
    );
  };

  const getMobileNavLinkClasses = (path) => {
    return `text-gray-600 transition-colors py-2 px-3 rounded-lg
      ${
        isActive(path)
          ? "text-blue-600 font-medium bg-blue-50"
          : "hover:text-blue-600 hover:bg-gray-50"
      }
    `;
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/home" className="text-xl font-bold text-blue-600">
              NutriXConnect
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={getNavLinkClasses(item.path)}
              >
                {item.title}
                {getActiveIndicator(item.path)}
              </Link>
            ))}
          </div>

          {/* User Profile - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/profile">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <User className="h-6 w-6 text-blue-600" />
                  )}
                </div>
              </div>
            </Link>
            <button
              className="p-2 rounded-3xl bg-red-400"
              onClick={() => dispatch(signout())}
            >
              <LogOut className="text-white" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Mobile Menu HeaderComponent */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-blue-600">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-blue-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile User Profile */}
          <div className="mb-8 flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <User className="h-6 w-6 text-blue-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={getMobileNavLinkClasses(item.path)}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <button
              className="flex gap-2 p-2 rounded-lg bg-red-400 text-white"
              onClick={() => dispatch(signout())}
            >
              <LogOut className="ml-2" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default HeaderComponent;
