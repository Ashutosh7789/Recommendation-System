import { navLinks } from "@/constants"


const SideNavbar = () => {
  return (
    <div className="flex justify-between gap-10 py-6">
        <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-semibold cursor-pointer text-white text-gradient">
                  <a href="/">
                    FlixWave
                  </a> 
            </h1>
            <ul className="hidden items-center justify-end flex-1 gap-10 list-none sm:flex">
                    {navLinks.map((link) => (
                        <li key={link.id} className="font-normal cursor-pointer text-[16px] text-white">
                                <a href={link.url}>{link.title}</a>
                            </li>
                    ))}
            </ul>
                        
          </div>
    </div>
  )
}

export default SideNavbar