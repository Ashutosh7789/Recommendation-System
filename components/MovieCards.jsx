import React from 'react'

const MovieCards = ({movie,onCardClick,currentIndex}) => {
  return (
      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="img" className="object-contain rounded-lg select-none xxl:max-w-[14rem] md:max-w-[12rem] sm:max-w-[10rem] max-w-[7rem] ms-6" onClick={() => onCardClick(currentIndex)}/>
  )
}

export default MovieCards