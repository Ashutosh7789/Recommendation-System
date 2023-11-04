
import Nav from "@/components/Nav"
import HomePage from "@/components/HomePage"




export default function Home() {




  return (
    <section>
      <div className="paddingX flexCenter">
        <div className="boxWidth relative">
          <Nav/>
        </div>
      </div>
      <div className="flexStart">
        <div className="boxWidth">
          <HomePage/>
        </div>
      </div>
    </section>
  )
}
