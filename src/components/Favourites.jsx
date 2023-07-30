import React from 'react'
import { useState } from 'react'
import Pagination from './Pagination'
import { useEffect } from 'react';

function Favourites() {

  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
  }
  const [currGenre, setCurrGenre] = useState('All Genres') 
  const [favourites, setFavourites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
     // it runs everytime page reloads
    let oldFav = localStorage.getItem("movie_mania");
    oldFav = JSON.parse(oldFav) || [];
    setFavourites([...oldFav]);

  }, [])

  // for generes
  useEffect(() => {
    let temp = favourites.map( (movie) => genreids[movie.genre_ids[0]] );
    console.log(temp);
    temp = new Set(temp); // remove duplicates as we convert temp to set
    setGenres(["All Genres", ...temp]);
    console.log("g" , genres);
  },[favourites])

  let del = (movie) => {
    let newMovies = favourites.filter((m) => m.id !== movie.id);
    setFavourites([...newMovies]);
    localStorage.setItem("movie_mania", JSON.stringify(newMovies));
  }
  
  let filteredMovies = [];
  filteredMovies = currGenre == "All Genres" ? favourites : favourites.filter( (movie) => genreids[movie.genre_ids[0]] == currGenre);

  //searching
  filteredMovies = filteredMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  //sorting 
  
  if(rating == 1){
    filteredMovies = filteredMovies.sort(function(a,b){return a.vote_average - b.vote_average});
  }else if(rating == -1){
    filteredMovies = filteredMovies.sort(function(a,b){return b.vote_average - a.vote_average});
  }

  if(popularity == 1){
    filteredMovies = filteredMovies.sort(function(a,b){return a.popularity - b.popularity});
  }else if(popularity == -1){
    filteredMovies = filteredMovies.sort(function(a,b){return b.popularity - a.popularity});
  }

  //pagination
  let maxPage = Math.ceil(filteredMovies.length/row);
  let si = (currentPage-1)*row;
  let ei = Number(si) + Number(row);

  filteredMovies = filteredMovies.slice(si, ei);

  let prevPage = () => {
    if(currentPage > 1) {
       setCurrentPage(currentPage - 1);
    }
  }
  
  let nextPage = () =>{
    if(currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  }


  return (
    <div className="overflow-x-hidden">
        <div className="mt-4 px-2 flex justify-center flex-wrap space-x-2">
            {
              genres.map( (genre) =>
                <button className={
                currGenre === genre ?
                "m-2 text-lg p-1 px-2 bg-blue-500 text-white rounded-xl font-bold": 
                "m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-500 text-white rounded-xl font-bold"}
                onClick={() =>{ 
                  setCurrentPage(1);
                  setCurrGenre(genre)}}
                >{genre}
                </button>
              )
            }
        </div>

        <div className="flex flex-col items-center">
            <div className="relative text-gray-600 mt-2 w-1/2">
                <input type="search" name="search" value={search} placeholder="Search"  onChange={(e) => {setSearch(e.target.value)}} className="border border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full" />
                <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                  <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M18.95 17.585l-4.352-4.352a7.5 7.5 0 1 0-1.414 1.414l4.352 4.352a1 1 0 0 0 1.414-1.414zM3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"/></svg>
                </button>
            </div>
            <div className='mt-6 text-center'>
                <label htmlFor='rowsPerPage' className='text-gray-600 font-bold mr-2'>Rows per page:</label>
                <input id='rowsPerPage' placeholder='Enter number' value={row} onChange={(e) => {setRow(e.target.value)}} type='number' className='border border-gray-300 rounded-md p-2 text-center w-14 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'></input>
            </div> 
            {/*<input placeholder='Rows' value={row} onChange={(e) => {setRow(e.target.value)}} type='number' className="border-2 text-center p-1 m-2"></input>*/}
        </div>
        
        <div className="flex flex-col m-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 min-w-full">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className='flex'>
                      <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' className='mr-2 cursor-pointer'   
                       onClick={ () => {
                          setPopularity(0)
                          setRating(-1)}} />
                      Rating
                      <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png'
                        className='ml-2 mr-2 cursor-pointer' onClick={ () => {
                          setPopularity(0)
                          setRating(1)}} />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className='flex'>
                      <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png'
                       
                        className='mr-2 cursor-pointer' onClick={ () => {
                          setRating(0)
                          setPopularity(-1)}}/>
                      Popularity
                      <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png' className='ml-2 mr-2 cursor-pointer'
                        onClick={ () => {
                          setRating(0)
                          setPopularity(1)}}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Genre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMovies.map((movie) => (
                  <tr key={movie.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                          <img className="hidden md:block md:h-[100px] md:w-[180px]" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 font-bold">{movie.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movie.vote_average}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movie.popularity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {genreids[movie.genre_ids[0]]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <button href="#" className="text-red-600 hover:text-red-900"
                        onClick={() => del(movie)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

        <div className='flex flex-row justify-center mt-4'>
         <div className="">                 
          <Pagination pageProp={currentPage} prevPage={prevPage} nextPage={nextPage}/>
          </div> 
        </div>

    </div>
  )
}

export default Favourites