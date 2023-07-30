import React from 'react'
import { Link } from 'react-router-dom';

const Cover = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
  <div className="text-white text-center">
    <h1 className="text-5xl font-bold mb-4">Movie Mania</h1>
    <p className="text-lg mb-8">Discover all the latest movies with movie mania!</p>
    <Link to="/movies">
        <button className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">Explore Movies</button>
    </Link>
  </div>
</div>

  )
}

export default Cover