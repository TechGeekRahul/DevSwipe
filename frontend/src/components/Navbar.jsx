import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, {withCredentials: true});
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  }

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary border-b-2 border-primary' : '';
  }

  return (
    <nav className="bg-card-bg shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold code-text">
                <span className="text-primary">&lt;</span>
                DevSwipe
                <span className="text-primary">/&gt;</span>
              </span>
            </Link>
          </div>

          {user && (
            <>
              <div className="hidden md:flex items-center space-x-4">
                <Link 
                  to="/" 
                  className={`px-3 py-2 text-sm font-medium hover:text-primary ${isActive('/')}`}
                >
                  Feed
                </Link>
                <Link 
                  to="/connections" 
                  className={`px-3 py-2 text-sm font-medium hover:text-primary ${isActive('/connections')}`}
                >
                  Connections
                </Link>
                <Link 
                  to="/requests" 
                  className={`px-3 py-2 text-sm font-medium hover:text-primary ${isActive('/requests')}`}
                >
                  Requests
                </Link>
                <Link 
                  to="/profile" 
                  className={`px-3 py-2 text-sm font-medium hover:text-primary ${isActive('/profile')}`}
                >
                  Profile
                </Link>
              </div>

              <div className="flex items-center">
                <div className="hidden md:flex items-center mr-4">
                  <span className="text-sm opacity-75">Welcome, <span className="font-medium">{user.firstName}</span></span>
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="flex rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.photoUrl}
                      alt={`${user.firstName}'s profile`}
                    />
                  </button>
                
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-card-bg rounded-md shadow-lg py-1 z-10 border border-gray-700">
                      <div className="md:hidden px-4 py-2 text-sm text-gray-400">
                        Welcome, {user.firstName}
                      </div>
                      <div className="md:hidden border-b border-gray-700 my-1"></div>
                      
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-700 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/connections"
                        className="block px-4 py-2 text-sm hover:bg-gray-700 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Connections
                      </Link>
                      <Link
                        to="/requests"
                        className="block px-4 py-2 text-sm hover:bg-gray-700 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Requests
                      </Link>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          
          {!user && (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-1 text-sm rounded-md border border-primary text-primary hover:bg-primary hover:bg-opacity-10"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 text-sm rounded-md bg-primary text-white hover:bg-opacity-90"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
