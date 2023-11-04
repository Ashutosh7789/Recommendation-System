'use client'
import { FaSearch } from "react-icons/fa"
import { useEffect,useState } from 'react';
import {MdFastRewind , MdFastForward} from 'react-icons/md'
import { useRouter } from "next/navigation";

const SearchCards = () => {
  const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjZlNzc3NThmY2UzZTRlZTQ4OGMyZDE5ZmE5ODE0MyIsInN1YiI6IjY0ZTFhNTJkZGE5ZWYyMDEzYzVlMjA2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ns-GYQHAdm0n9q0eiQvAP7et-2RkOmoUxT4NCYXm_xc'
    }
  };

    const [MovieData , setMovieData] = useState([])
    const [totalPages , setTotalPages] = useState(1)
    const [currentPage , setCurrentPage] = useState(1)
    const [searchText, setSearchText] = useState('')
    const router = useRouter()
    
    
    const popularUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${currentPage}`
    
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };
    
    const visiblePages = [];
    const leftRange = currentPage - 1;
    const rightRange = currentPage + 1;
    
    for (let i = Math.max(1, leftRange - 1); i <= Math.min(totalPages, rightRange + 1); i++) {
        visiblePages.push(i);
    }

    const getMovieData = async () => {
        const Url = searchText ? searchUrl: popularUrl 
        const response = await fetch(Url, options)
        const data = await response.json()
        setMovieData(data.results)
        if (data.total_pages > 100) {
            setTotalPages(100)
        } else {
            setTotalPages(data.total_pages)
        }
    }
    
    useEffect(() => {
        getMovieData()
    }, [currentPage])
    

  return (
    <div className="flex justify-center flex-col">
        <form className="flex rounded-full justify-center my-10 gap-2 md:gap-4">
        <input type="text" name="searchText"
            className="w-full max-w-[30rem] md:max-w-[40rem] py-4 px-6 border rounded-xl bg-slate-50 
            outline-none text-black text-lg"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e)=>setSearchText(e.target.value)}
        />
        <button type="button" onClick={getMovieData}>
          <span className="text-white flex items-center hover:text-[#6366f1]"><FaSearch size={35} /></span>
        </button>
        </form>


        <div className=" flex flex-row gap-8 flex-wrap cursor-pointer select-none w-full my-10 justify-center sm:px-4">
        {MovieData.map((movie, index) => {
           if (movie.poster_path) {
             return (
                <div key={index} className="sm:max-w-[11rem] lg:max-w-[14rem] max-h-[450px] h-full w-full flex items-center flex-row sm:flex-col gap-4 justify-center sm:justify-between">
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
          );
        } else {
          return null; 
        }
        })}
        </div>
          

          

           <div className='justify-center items-center text-2xl my-5 flex gap-6'>
                <button onClick={() => handlePageClick(1)} disabled={currentPage === 1} className='mx-2 max-sm:hidden'>
                    First
                </button>
              <button onClick={() => handlePageClick(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className='mx-2'>
                  <MdFastRewind  size={35}/>
                </button>
                {visiblePages.map((page) => (
                    <button key={page} onClick={() => handlePageClick(page)} disabled={page === currentPage} className={`mx-2`}>
                    {page}
                    </button>
                ))}
              <button onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className='mx-2'>
                  <MdFastForward  size={35}/>
                </button>
                <button onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages} className='mx-2 max-sm:hidden'>
                    Last
                </button>
            </div>


        

    </div>
  )
}

export default SearchCards