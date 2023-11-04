import Nav from "@/components/Nav"
import MoviePage from "@/components/MoviePage"
const Movie = () => {
  return (
    <section>
      <div className="paddingX flexCenter">
        <div className="boxWidth z-50">
          <Nav/>
        </div>
      </div>
      <MoviePage />
    </section>
  )
}

export default Movie