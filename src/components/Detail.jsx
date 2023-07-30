import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Detail = () => {

  const {id} = useParams();
  const [movie, setMovie] = useState({})

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US`).then(res => {console.log(res.data) 
    setMovie(res.data);
    })
  },[]);

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(movie.vote_average / 2)) {
        stars.push(<i key={i} className="fas fa-star text-yellow-600 text-2xl inline-block mr-1"></i>);
        } else {
        stars.push(<i key={i} className="far fa-star text-yellow-600 text-2xl inline-block mr-1"></i>);
        }
    }

  return (
    <div className="h-[80vh] overscroll-none m-8">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Movie Poster */}
          <div className="md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="rounded-lg shadow-md"
            />
          </div>
          {/* Movie Info */}
          <div className="md:w-2/3 md:ml-8">
            {/* Movie Title */}
            <h1 className="text-3xl font-bold mb-2 mt-2">{movie.title}</h1>
            {/* Movie Release Date and Rating */}
            <div className="flex flex-col mb-4">
              <span className="py-1 mt-5 mb-2 text-lg">
                Rating : {stars}
              </span>
              <span className="py-1 mt-3 mb-2 text-lg">
                Release Year : {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
            {/* Movie Description */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Movie overview</h2>
            <p className="text-lg leading-relaxed mb-4 text-justify">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail