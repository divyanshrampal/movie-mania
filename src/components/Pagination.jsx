import React from 'react'

function Pagination({pageProp, prevPage, nextPage}) {
  
  return (
    <div className="w-full flex justify-center mb-8">
  <button
    className="p-3 text-sm bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-l-full focus:outline-none"
    onClick={prevPage}
  >
    Prev
  </button>
  <div className="p-3 text-sm bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none">{pageProp}</div>
  <button
    className="p-3 text-sm bg-gray-200 text-gray-600 hover:bg-gray-300 rounded-r-full focus:outline-none"
    onClick={nextPage}
  >
    Next
    
  </button>
</div>

  )
}

export default Pagination