'use client'

import { useState,useEffect } from "react"

const DetailHero = ({id}) => {
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjZlNzc3NThmY2UzZTRlZTQ4OGMyZDE5ZmE5ODE0MyIsInN1YiI6IjY0ZTFhNTJkZGE5ZWYyMDEzYzVlMjA2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ns-GYQHAdm0n9q0eiQvAP7et-2RkOmoUxT4NCYXm_xc'
    }
  };
    

    const [movieData , setMovieData] = useState({}) 
    const [genres, setGenres] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getMovieData = async () => {
        setIsLoading(true)
        const response  = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        const data = await response.json()
        setMovieData(data)
        setGenres(data.genres)
        setTimeout(() => {
                setIsLoading(false)
        },1500)
    }
    
    useEffect(  () => {
        getMovieData()
    }, [])






    return (
      <>
        {isLoading && (
            <div className="flex h-screen items-center justify-center">
                <h1 className="text-[3rem] xs:text-[5rem]  md:text-[10rem] text-gradient text-center">
                    Loading!... <br /> Please Wait
                </h1>
            </div> 
        )}
        {!isLoading && (
        <>
            <div className="flex flex-col overflow-hidden items-center ">
                {movieData.backdrop_path && (                            
                <img src={`https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`} alt={movieData.title} className="object-contain opacity-60" />
                )}
                {!movieData.backdrop_path && (
                    <div className="flex flex-col sm:flex-row gap-8 cursor-pointer overflow-hidden select-none items-center wide:mx-0 mx-6 h-screen justify-center">
                    <div className="max-w-[14rem] xxl:max-w-[18rem] w-full flex items-center flex-row gap-10 justify-between">
                        <img src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`} alt={movieData.title} className="object-contain rounded-lg relative select-none" />
                    </div>
                    <div className="flex flex-col gap-2 ss:gap-4 lg:gap-8">
                        <h1 className=" text-base ss:text-2xl md:text-4xl font-bold">
                            {movieData.title}
                        </h1>
                                <p className="paragraph max-ss:text-xs max-md:text-base wide:w-[60rem]">
                            {movieData.overview}
                                </p>
                        <div className="flex flex-row gap-4 items-center ">   
                            {genres.map((genre, index) => (
                                <p key={index} className="paragraph max-ss:text-xs max-md:text-base">
                                    {genre.name}    
                                </p>
                            ))}        
                        </div>
                        <p className="paragraph max-ss:text-xs max-md:text-base">
                            Rating : {movieData.vote_average}   
                        </p>              
                    </div>
                </div>
                )}



                {movieData.backdrop_path && (                            
                <div className="flex flex-row gap-8 wide:absolute top-[27rem] left-28 cursor-pointer   overflow-hidden select-none items-center wide:mx-0 mx-6">
                    <div className="hidden max-w-[14rem] xxl:max-w-[18rem] h-full w-full wide:flex items-center flex-row gap-10 justify-between">
                        <img src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`} alt={movieData.title} className="object-contain rounded-lg relative select-none" />
                    </div>
                    <div className="flex flex-col gap-2 ss:gap-4 lg:gap-8">
                        <h1 className=" text-base ss:text-2xl md:text-4xl font-bold">
                            {movieData.title}
                        </h1>
                                <p className="paragraph max-ss:text-xs max-md:text-base wide:w-[60rem]">
                            {movieData.overview}
                                </p>
                        <div className="flex flex-row gap-4 items-center ">   
                            {genres.map((genre, index) => (
                                <p key={index} className="paragraph max-ss:text-xs max-md:text-base">
                                    {genre.name}    
                                </p>
                            ))}        
                        </div>
                        <p className="paragraph max-ss:text-xs max-md:text-base">
                            Rating : {movieData.vote_average}   
                        </p>              
                    </div>
                </div>
                )}        
            </div>
        </>
        )}
    </>
  )
}

export default DetailHero