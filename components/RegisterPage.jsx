'use client'
import Link from 'next/link'
import { HiAtSymbol, HiFingerPrint,HiOutlineUser } from "react-icons/hi";
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const RegisterPage = () => {
    const router = useRouter()
    const [show , setShow] = useState({
      password:false,
      cPassword:false
    })
    const [message, setMessage] = useState('')
    const [cPassword , setCPassword] = useState('')
    const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  })

  const handleRegister = async (e) => {
      e.preventDefault();

    if (!user.username || !user.email || !user.password || !cPassword) {
      return (
        setMessage('Please fill all fields')
      )
        }
    if (user.password !== cPassword) {
      return (
        setMessage("Password and confirm Password does not match")
      )
    }
        
    try {
      setMessage("")    
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const data = await response.json()
      if (response.status === 501) {
        return (
          setMessage(data.message) 
        )
      }
      if (response.status === 200) {
        setUser({
          username: "",
          email: "",
          password: "",
        })
        setMessage('Registered successfully')
        router.push('/login')
      }

    } catch (error) {
      console.log(error);
    }
  }



    return (
      <section className='w-3/4 mx-auto flex flex-col gap-10 text-center '>
          <div className='flex flex-col gap-4'>
              <h1 className='text-gray-800 text-4xl font-bold '>Register</h1>
              <p className='w-3/4 mx-auto text-gray-400'>
                  Join With Us and Enjoy Best moments of Your Life
              </p>
          </div>
            <form className='flex flex-col gap-5' onSubmit={handleRegister}>
                

              <div className='input_field '>
                  <input type="text" name='username' placeholder='Username' value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })} className='text-black'
                    />
                  <span className='text-[#CBD5E1] flex items-center px-4 hover:text-[#6366f1] cursor-pointer'>
                      <HiOutlineUser size={25}/>
                  </span>
              </div>

                

              <div className='input_field '>
                  <input type="email" name='email' placeholder='email' value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className='text-black'
                    />
                  <span className='text-[#CBD5E1] flex items-center px-4 hover:text-[#6366f1] cursor-pointer'>
                      <HiAtSymbol size={25}/>
                  </span>
                </div>
                


              <div className='input_field'>
                    <input type={show.password ? 'text' : 'password'} name='password' placeholder='password'
                        value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className='text-black'
                    />
                    <span className='text-[#CBD5E1] flex items-center px-4 hover:text-[#6366f1] cursor-pointer'
                        onClick={() => setShow({...show,password:!show.password})}>
                    <HiFingerPrint size={25}/>
                </span>
            </div>
                

              <div className='input_field'>
                <input type={show.cPassword ? 'text':'password'} name='cPassword' placeholder='confirm password' value={cPassword} onChange={(e) => setCPassword(e.target.value)} className='text-black'/>
                    <span className='text-[#CBD5E1] flex items-center px-4 hover:text-[#6366f1] cursor-pointer'
                        onClick={() => setShow({...show,cPassword:!show.cPassword})}>
                    <HiFingerPrint size={25}/>
                </span>
          </div>
          
          {
              message && (
              <div className="mt-3">
                <p className="font-poppins text-red-600 text-left">
                  {message}
                </p>
              </div>  
            )}

              <div>
                  <button type='submit' className='blue_btn'>
                    Register
                  </button>
              </div>
            </form>









          <p className='text-center text-gray-400'>
              Have an Account?
              <Link href={'/login'} className='text-blue-700' > SignIn</Link>
          </p>
    </section>
  )
}

export default RegisterPage