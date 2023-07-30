import React from 'react'
/*import Image from "../banner.jpg"*/
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import { useState, useEffect } from 'react'
import Pagination from './Pagination'
import { NavLink } from 'react-router-dom';

function Movies() {
  const [page, setPage] = useState(1);
  
  function nextPage() {
    setPage(page + 1);
  }

  function prevPage() {
    if(page > 1)
      setPage(page - 1);
  }


  const [movies, setMovies] = useState([])
  useEffect(function(){
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=5540e483a20e0b20354dabc2d66a31c9&page=${page}`).then(res => {console.table(res.data.results) 
    setMovies(res.data.results);})

    // it runs everytime page reloads
    let oldFav = localStorage.getItem("movie_mania");
    oldFav = JSON.parse(oldFav) || [];
    setFavourites([...oldFav]);
    
  }, [page])

  const [hover, setHover] = useState('')
  const [favourites, setFavourites] = useState([])

  let add = (movie) => {
    let newMovies = [...favourites, movie];
    setFavourites([...newMovies]);
    console.log(newMovies);
    localStorage.setItem("movie_mania", JSON.stringify(newMovies));
  }

  let del = (movie) => {
    let newMovies = favourites.filter((m) => m.id !== movie.id);
    setFavourites([...newMovies]);
    localStorage.setItem("movie_mania", JSON.stringify(newMovies));
  }

  return (
    <>
    <div className='mb-8'>
        <div className='mt-8 mb-8 font-bold text-2xl text-center'>Trending Movies</div>
        {
          movies.length === 0? <div className='flex justify-center'> <Oval 
                                height="80"
                                width="80"
                                radius="9"
                                color="green"
                                ariaLabel="loading"
                                wrapperStyle
                                wrapperClass
                              /></div>:
          <div className='flex flex-wrap justify-center'>
            {
                movies.map((movies) => (
                  <div className="w-72 h-[400px] bg-gray-800 rounded-lg overflow-hidden m-4 hover:shadow-xl">
  <div
    className="w-full h-[200px] bg-center bg-cover"
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movies.backdrop_path})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  ></div>
  <div className="p-4 h-1/2 flex flex-col justify-between">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-white text-lg font-medium w-40">{movies.title}</h2>
      {!favourites.find((m) => m.id === movies.id) ? (
        <button
          className="text-gray-200 hover:text-red-500 focus:outline-none"
          onClick={() => add(movies)}
        >
          <i className="far fa-heart fa-2xl"></i>
        </button>
      ) : (
        <button
          className="text-red-500 hover:text-gray-200 focus:outline-none"
          onClick={() => del(movies)}
        >
          <i className="fas fa-heart fa-2xl"></i>
        </button>
      )}
    </div>
    <div className="mb-3">
    <NavLink
      className="block text-center bg-blue-500 hover:bg-red-600 text-white font-semibold py-2 mt-2 rounded"
      to={`/detail/${movies.id}`}
    >
      View Details
    </NavLink>
    </div>
  </div>
</div>

                ))
            }
          </div>
        }
     </div>
     <Pagination pageProp = {page} prevPage={prevPage} nextPage={nextPage}></Pagination>  
    </>
  )
}

export default Movies