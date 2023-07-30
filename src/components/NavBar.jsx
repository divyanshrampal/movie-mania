import React from 'react';
import Logo from "../logo.png";
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <nav className="flex flex-row justify-between items-center bg-gray-900 px-4 py-3">
    <Link to="/">
    <div className="flex items-center space-x-3">
    
        <img className="w-10 md:w-12" src={Logo} alt="logo" />
        <h1 className="text-lg md:text-2xl font-bold text-white uppercase tracking-widest md:block hidden">
          <span className="text-blue-500">Movie</span>Mania
        </h1>
    </div>
    </Link> 
  <div className="flex items-center space-x-6">
    <Link to="/movies" className="font-medium text-white text-2xl hover:text-blue-500 transition-colors duration-300">
      Movies
    </Link>
    <Link to="/favourites" className="font-medium text-white text-2xl hover:text-blue-500 transition-colors duration-300">
      Favourites
    </Link>
    
  </div>
  </nav>

  )
}

export default NavBar