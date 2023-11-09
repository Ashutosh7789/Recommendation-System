'use client'
import { useState, useEffect,useRef,useLayoutEffect } from "react";
import { heroMovies } from "@/constants";
import MovieCards from "./MovieCards";


const Hero = ({isLoading,setIsLoading}) => {

    const [movieList, setMovieList] = useState([]);
    const [currentMovie, setCurrentMovie] = useState({});
    const containerRef = useRef(null);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
  
  
  
    const handleMouseDown = (e) => {
      setIsDragging(true);
      containerRef.current.style.cursor = 'grabbing';
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      containerRef.current.style.cursor = 'pointer';
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 5000; // Adjust the scrolling speed
      containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      containerRef.current.style.cursor = 'pointer';
  }
  


  const handleTouchStart = (e) => {
    setIsDragging(true);
    containerRef.current.style.cursor = 'grabbing';
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = 'pointer';
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 500; // Adjust the scrolling speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchCancel = () => {
    setIsDragging(false);
    containerRef.current.style.cursor = 'pointer';
  };
    
  
  
  const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjZlNzc3NThmY2UzZTRlZTQ4OGMyZDE5ZmE5ODE0MyIsInN1YiI6IjY0ZTFhNTJkZGE5ZWYyMDEzYzVlMjA2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ns-GYQHAdm0n9q0eiQvAP7et-2RkOmoUxT4NCYXm_xc'
    }
  };


  useEffect(() => {
    const getMovie = async () => {
      setMovieList([])
      heroMovies.map(async (movie) => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, options)
          const data = await response.json();
          setMovieList(prevMovieList => [...prevMovieList, data]) 
        } catch (error) {
          console.log(error)
        }
      })
    }
    getMovie()
  }, [])
  

useEffect(() => {
  setCurrentMovie(movieList[0])
    setTimeout(() => {
      // Once loading is complete, update the isLoading state to true
      setIsLoading(false);
    }, 1500); 
  },[movieList])

  //   const backgroundImage = {
  //     backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path})`,
  //     backgroundSize: 'auto 100%'
  // };


  const handleCardClick = (index) => {
    setCurrentMovie(movieList[index]);
  };


  return (
    <div className=" wide:h-screen overflow-hidden">
          {isLoading && (
                <div className="flex text-center min-h-screen items-center justify-center">
                    <h1 className=" text-[3rem] xs:text-[5rem]  md:text-[10rem]  text-gradient">
                        Loading!...<br/> Please Wait
                    </h1>
                </div> 
          )}
      {!isLoading && (
      <div className="relative flex flex-col gap-10 items-center " >
          <img src={`https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path}`} alt="img" className="object-contain relative opacity-50 w-full" />
          
          <div className="absolute top-[10rem] ss:top-[13rem] sm:top-[18rem] md:top-[25rem] lg:top-[30rem] wide:top-[30rem] xxl:top-[37rem] left-8 xxl:left-[8rem] flex flex-col gap-4">
          <h1 className=" text-xl ss:text-2xl md:text-4xl font-bold wide:p-0 px-8 max-ss:text-center">
            {currentMovie?.title}
            </h1>
            <p className="paragraph xxl:w-[60rem] wide:w-[50rem] wide:p-0 px-8 ss:overview_1 lg:overview_2 wide:block overflow-hidden hidden">
              {currentMovie?.overview}
            </p>
          </div>
          {!isLoading && (
          <div className="flex wide:absolute top-[27rem] xxl:top-[34rem] right-0 cursor-pointer select-none overflow-hidden"
            >
              <div className="flex flex-row flex-1 xxl:max-w-[45rem]  wide:max-w-[36rem] w-full overflow-y-scroll max-md:max-w-[36rem] max-sm:max-w-[22rem]"
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
              >
              {movieList.map((movie,index) => (
                <MovieCards key={index} movie={movie} currentIndex={index} onCardClick={handleCardClick} />
              ))}
              </div>
          </div>
          )}
      </div>
      )}
    </div>
  )
}

export default Hero