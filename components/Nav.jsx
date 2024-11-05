'use client'

import { useRouter } from "next/navigation"
import { signOut, useSession } from 'next-auth/react';
import { useState } from "react";
import { navLinks } from "@/constants";
import { MdLogout ,  MdPassword } from "react-icons/md"
// import { CgProfile } from "react-icons/cg"
import { HiMenuAlt3, HiDownload } from "react-icons/hi"
import { IoClose } from "react-icons/io5"
// import QRCode from "qrcode.react"
import ResetPassword from './../app/ResetPassword/page';


const Nav = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [menu, setMenu] = useState(false)
    const [toggle, setToggle] = useState(false)
    const firstLetter = session?.user?.name?.charAt(0).toUpperCase() || session?.user?.username?.charAt(0).toUpperCase()
    
    // const QRCodeText = 'dahiyahitesh064@oksbi'

    const handleSignOut = async () => {
    await signOut({ callbackUrl: 'http://localhost:3000' })
  }

  const downloadFile = () => {
    const DownloadUrl = 'http://localhost:3000/assets/final_ppt.pptx'
    const aTag = document.createElement('a');
    aTag.href = DownloadUrl;
    aTag.download = "FlixWave.pptx"

    // Append the anchor to the body
    document.body.appendChild(aTag);

    // Trigger a click on the anchor to start the download
    aTag.click();

    // Remove the anchor from the body
    document.body.removeChild(aTag);

  }




  return (
    <div className="flex justify-between gap-10 py-6 relative px-4 z-50">
        <div className="flex justify-between items-center w-full">
            <h1 className=" text-xl sm:text-3xl font-semibold cursor-pointer text-white text-gradient">
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
          {/* <QRCode value={QRCodeText} /> */}
            </ul>
                        
        </div>
          
      


        {/* Mobile View */}
        <div className="flex items-center justify-end flex-1 sm:hidden">
            {toggle===false && (     
              <span onClick={() => setToggle((prev) => !prev)} className="text-white">
                  <HiMenuAlt3  size={35}/>
              </span>
              )}
            {toggle===true && (     
              <span onClick={() => setToggle((prev) => !prev)} className="text-white">
                  <IoClose  size={35}/>
              </span>
              )}
              
        
            <div className={`${toggle ? 'flex':'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
                <ul className="flex flex-col items-center justify-end flex-1 gap-4 list-none">
                    {navLinks.map((nav) => (
                    <li key={nav.id} className="font-normal cursor-pointer font-poppins text-[16px] text-white">
                        < a href={nav.url}>{nav.title}</a>
                    </li>
                    ))}
                      {session && (
                        <ul className="flex flex-col items-center justify-end flex-1 gap-4 list-none">
                            <li className="font-normal cursor-pointer text-[16px] text-white flex gap-2">
                              <button type="button" className="text-white flex gap-2" onClick={downloadFile}>
                                Download
                            </button>
                                
                            </li>

                        <button type="button" className="text-white flex gap-2" onClick={handleSignOut}>
                                Logout
                            </button>   
                        </ul>  
                      )}
                      {!session && (
                            <button type="button" className="text-white flex gap-2" onClick={()=> router.push("/login")}>
                                Login
                            </button>   
                      )}
                    </ul>
            </div>
        </div>





      {/* Desktop View */}
        <div className="items-center gap-4 hidden sm:flex">
                  {session && (
                      <div>
                        <div className="profile-icon cursor-pointer" onClick={()=>setMenu((prev)=>!prev)}>
                                {firstLetter}
                          </div>
                      </div>
                  )}

                  {menu && (
                        <div className="p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar">
                        <div className="flex flex-col gap-4 items-start">
                        <ul className="flex flex-col items-center justify-end flex-1 gap-4 list-none">
                          <li className="font-normal cursor-pointer text-[16px] text-white flex gap-2">
                            <button type="button" className="text-white flex gap-2" onClick={downloadFile}>
                              <span><HiDownload size={25} /></span>
                                Download
                            </button>
                          </li>
                        </ul>
                        
                        <button type="button" className="text-white flex gap-2" onClick={()=> router.push('/ResetPassword')}>
                              <span>
                                <MdPassword size={25} />
                              </span>
                              Change 
                        </button>
                        <button type="button" className="text-white flex gap-2" onClick={handleSignOut}>
                              <span>
                              <MdLogout size={25} />
                              </span>
                              Logout
                        </button>
                        </div>
                    </div>
              )}
                {!session && (        
                        <button type="button" className="blue_btn px-6 font-semibold" onClick={()=>router.push("/login")}>
                        login
                    </button>
              )}
        </div>
          
    </div>

  )
}

export default Nav