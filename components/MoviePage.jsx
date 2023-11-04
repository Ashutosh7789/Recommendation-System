'use client'
import Hero from "./Hero";
import SearchCards from "./SearchCards";
import { useState } from "react";

const MoviePage = () => {
      const [isLoading , setIsLoading] = useState(true);
  return (    
        <div className="relative -top-[98px]">
          <Hero isLoading={isLoading} setIsLoading={setIsLoading} />
      {!isLoading && (
        <div className="boxWidth m-auto"> 
          <SearchCards />
        </div>
        )}    
    </div>
  )
}

export default MoviePage