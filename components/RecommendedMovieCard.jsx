'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
const RecommendedMovieCard = ({recommendedMovies}) => {
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjZlNzc3NThmY2UzZTRlZTQ4OGMyZDE5ZmE5ODE0MyIsInN1YiI6IjY0ZTFhNTJkZGE5ZWYyMDEzYzVlMjA2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ns-GYQHAdm0n9q0eiQvAP7et-2RkOmoUxT4NCYXm_xc'
    }
  };

    const router = useRouter()
    const [movieData , setMovieData] = useState([]);
    const [isLoading, setIsLoading] = useState(true) 


    const getMovieData = async () => {
        {
            setIsLoading(true)
            recommendedMovies.map( async (movie) => {
            const response  = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, options)
            const data = await response.json()
                setMovieData(prevMovieData => [...prevMovieData, data])
            })
            setTimeout(() => {
                setIsLoading(false)
            },1500)
        } 
    }
    useEffect(() => {
       getMovieData() 
    },[])



  return (
      <div>
        {!isLoading && (
        <div className=" flex flex-row gap-8 flex-wrap cursor-pointer select-none w-full my-10 justify-center sm:px-4">
              {movieData.map((movie ,index) => (
                <div key={index} className="lg:min-h-[450px] sm:max-w-[11rem] lg:max-w-[14rem]  h-full w-full flex items-center flex-row sm:flex-col gap-4 mx-6">
                      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="object-contain rounded-lg relative select-none max-sm:w-[8rem]" />
                      <div className="flex flex-col gap-4 items-start overflow-hidden sm:w-full">
                      <h3 className="movie_title overflow-hidden text-ellipsis">{movie.title}</h3>
                          <button type="button"
                              className="blue_gradient_btn w-[10rem]"
                              onClick={()=> router.push(`/movies/details/${movie.id}?title=${movie.title}`,)}>
                              Details
                          </button>
                      </div>
            </div>
            ))}
        </div>   
        )}          
    </div>
  )
}

export default RecommendedMovieCard