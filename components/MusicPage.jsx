'use client'
import { useState ,useEffect } from "react";

const MusicPage = ({recommendedMusic}) => {

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '34c417ac4dmsh67aca18974044e8p17ce0djsncf07343b6c41',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

    // const url = 'https://shazam.p.rapidapi.com/search?term=faded&locale=en-US&offset=0&limit=5';
    // const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=faded';
    const [musicData , setMusicData] = useState([]);
    const [isLoading, setIsLoading] = useState(true) 

    async function fetchMusicData(music) {
    const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${music.track_name}`, options);
    return await response.json();
    }

    async function processRecommendedMusic() {
    const delayBetweenRequests = 500; // 500 milliseconds (2 requests per second)
        setIsLoading(true)
        for (const music of recommendedMusic) {
            const data = await fetchMusicData(music);
            setMusicData(prevMusicData => [...prevMusicData, data.data[0]]);

            // Introduce a delay before the next request
            await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
        }
        setIsLoading(false)
    }


    useEffect(() => { 
        processRecommendedMusic()
    },[])

  return (
      <div className="boxWidth m-auto">
        {isLoading && (
            <div className="flex text-center items-center justify-center">
                <h1 className=" text-[3rem] xs:text-[5rem]  md:text-[10rem]  text-gradient">
                    Loading!...<br/> Please Wait
                </h1>
            </div> 
          )}
        {!isLoading && (
        <div className=" flex flex-row gap-8 flex-wrap cursor-pointer select-none w-full my-10 justify-center sm:px-4">
              {musicData.map((music ,index) => (
                <div key={index} className="sm:max-w-[11rem] lg:max-w-[14rem]  h-full w-full flex items-center flex-row sm:flex-col gap-4 mx-6">
                      <img src={`${music.album.cover_big}`} alt={music.title} className="object-contain rounded-lg relative select-none max-sm:w-[8rem]" />
                      <div className="flex flex-col gap-4 items-start overflow-hidden sm:w-full">
                      <h3 className="movie_title overflow-hidden text-ellipsis">{music.title}</h3>
                      <h3 className="movie_title overflow-hidden text-ellipsis">By {music.artist.name}</h3>
                      </div>
            </div>
            ))}
        </div>   
        )}  
      </div>
  )
}

export default MusicPage