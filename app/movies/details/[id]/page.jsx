'use client'

import RecommendedMovieCard from "@/components/RecommendedMovieCard"
import { useSearchParams } from "next/navigation"
import { useParams } from "next/navigation"
import DetailHero from "@/components/DetailHero"
import { useState,useEffect } from "react"
import Nav from "@/components/Nav"


const movieDetails = () => {


    const searchParams = useSearchParams()
    const title = searchParams.get('title')
    const param = useParams()
    const id = param.id
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true) 

    const getRecommendations = async () => {
        try {
        setIsLoading(true)
          setRecommendedMovies([])
          const response = await fetch("http://localhost:5000/api/recommend",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ movie_name: `${title}`,movie_id: `${id}` }),
          })
          const data = await response.json();
          setRecommendedMovies(data.recommended_movies)
            setTimeout(() => {
                setIsLoading(false)
            },1000)
          
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
  };
    
    
    useEffect(() => {
        getRecommendations()
    }, [])





    return (
        <div >
            <div className="boxWidth m-auto ">
                <Nav />   
            </div>
            <div className="flex flex-col relative -top-[98px] ">
                <div className="xxl:min-h-screen"> 
                    <DetailHero id={id} />
                </div>
                {isLoading && (
                    <div className="my-20 ss:px-20">
                    <h1 className="ss:text-4xl text-center text-gradient">
                        Loading <br /> Recommendations!... <br /> Please Wait
                    </h1>
                </div>
                )}
                {!isLoading && (
                <div className="flex text-center my-10 ss:my-20 items-center justify-center">
                    <h1 className="ss:text-4xl text-center text-gradient">
                        Recommendations for {title}
                    </h1>
                </div>
                )}
                {!isLoading && (
                    <div className="boxWidth m-auto mt-10 mb-20 z-50">
                            <RecommendedMovieCard recommendedMovies={recommendedMovies} />
                    </div>
                )}
            </div>
      </div>
  )
}

export default movieDetails



