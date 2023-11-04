'use client'


import MusicPage from "@/components/MusicPage"
import Nav from "@/components/Nav"
import { FaSearch } from "react-icons/fa"
import { useState } from "react"

const music = () => {

    const [searchText , setSearchText] = useState('')
    const [recommendedMusic, setRecommendedMusic] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    const getMusic = async() => { 
        try {
            setIsLoading(true)
            setRecommendedMusic([])
            const [musicName, artistName] = searchText.split(',');
            const response = await fetch("http://localhost:5000/api/recommend/music",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ music_name: `${musicName}`,artist_name: `${artistName}` }),
          })
          const data = await response.json();
            setRecommendedMusic(data.recommended_music)
            setTimeout(() => {
                setIsLoading(false)
            },1000)
          
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    }




    return (
        <div>
            <div className="boxWidth m-auto">
                <Nav />
            </div>
            <div className="boxWidth m-auto flex rounded-full justify-center my-10 gap-2 md:gap-4 px-8">
                <input type="text" name="searchText"
                    className="w-full sm:max-w-[30rem] md:max-w-[40rem] py-4 px-6 border rounded-xl bg-slate-50 
                outline-none text-black text-lg"
                    placeholder="Faded , AlanWalker"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button type="button" onClick={getMusic}>
                    <span className="text-white flex items-center hover:text-[#6366f1]"><FaSearch size={35} /></span>
                </button>
            </div>
           {!isLoading && (
                recommendedMusic ? (
                    <MusicPage recommendedMusic={recommendedMusic} />
                ) : (
                    <div className="flex text-center items-center justify-center">
                        <h1 className="text-[3rem] xs:text-[5rem] md:text-[10rem] text-gradient">
                            Can't Recommend <br/> For {searchText}
                        </h1>
                    </div>
                )
            )}
    </div>
  )
}

export default music
