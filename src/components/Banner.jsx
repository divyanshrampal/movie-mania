import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'


function Banner() {

  const [movie, setMovies] = useState({})
  useEffect(function(){
    axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=5540e483a20e0b20354dabc2d66a31c9").then(res => {console.table(res.data.results) 
    setMovies(res.data.results[0]);})
  }, [])

  return (
    <> 
        <div className= {`bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] h-[40vh] md:h-[60vh] bg-center bg-cover flex items-end  `}>
          <div className=" text-xl md:text-3xl text-white p-6 bg-gray-900 bg-opacity-50 w-full flex justify-center">
                {movie.title}
          </div>
        </div>
    </>
  )
}

export default Banner