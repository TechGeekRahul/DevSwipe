import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#182333] text-text-light py-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <Link to="/" className="flex items-center justify-center md:justify-start">
              <span className="text-xl font-bold code-text">
                <span className="text-primary">&lt;</span>
                DevSwipe
                <span className="text-primary">/&gt;</span>
              </span>
            </Link>
            <p className="mt-1 text-xs opacity-60 max-w-md">
              Connect with developers who share your tech stack.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/" className="text-sm opacity-80 hover:text-primary">
              Home
            </Link>
            <Link to="/profile" className="text-sm opacity-80 hover:text-primary">
              Profile
            </Link>
            <Link to="/connections" className="text-sm opacity-80 hover:text-primary">
              Connections
            </Link>
            <Link to="/requests" className="text-sm opacity-80 hover:text-primary">
              Requests
            </Link>
          </div>
        </div>
        
        <div className="mt-4 pt-2 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DevSwipe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
