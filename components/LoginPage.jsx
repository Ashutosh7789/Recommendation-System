'use client'
import Image from 'next/image'
import Link from 'next/link'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [user, setUser] = useState(
        {
            email: '',
            password: ''
        }
    )
    const [message, setMessage] = useState('')

    // Google Handler Function
    const handleGoogleSignIn = async () => {
        await signIn('google', { callbackUrl: 'http://localhost:3000' })

    }

    // GitHub Handler Function
    const handleGitHubSignIn = async () => {
        await signIn('github', { callbackUrl: 'http://localhost:3000' })

    }

    // CredentialsProvider Handler Function 
    const handleCredentialSignIn = async (e) => { 
        e.preventDefault();
        setMessage("")
        try {
            const response = await signIn('credentials', {
                email: user.email,
                password: user.password,
                redirect : false,
            })
            console.log(response)
            if (response.status !== 200) {
                setMessage("Invalid credentials")
            }
            if (response.status === 200) {
                setMessage("Logged In Successfully")
                router.push('/')
            }
            
        } catch (error) { 
        console.log(error)
        }
    }




    return (
      <section className='w-3/4 mx-auto flex flex-col gap-10 text-center '>
          <div className='flex flex-col gap-4'>
              <h1 className='text-gray-800 text-4xl font-bold '>Explore</h1>
              <p className='w-3/4 mx-auto text-gray-400'>
                  Login and Find Out Best Movies for YourSelf  and Enjoy
              </p>
          </div>
          <form className='flex flex-col gap-5' >
              <div className='input_field'>
                  <input type="email" name='email' placeholder='email' value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })} className='text-black'
                    />
                  <span className='text-[#CBD5E1] flex items-center px-4 hover:text-[#6366f1]'>
                      <HiAtSymbol size={25}/>
                  </span>
              </div>
              <div className='input_field'>
                    <input type={show ? 'text' : 'password'} name='password' placeholder='password'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })} className='text-black'
                    />
                    <span className='text-[#CBD5E1] flex items-center px-4 hover:text-[#6366f1]'
                        onClick={() => setShow(prev => (!prev))}>
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
                  <button type='button' className='blue_btn' onClick={handleCredentialSignIn}>
                      Login
                  </button>
              </div>
              <div>
                  <button type='button'
                    className='Oauth_btn' onClick={handleGoogleSignIn}>
                      Sign In with Google
                        <Image src={'/assets/google.svg'} width={20} height={20} alt='Google'
                        />
                  </button>
              </div>
              <div>
                  <button type='button'
                        className='Oauth_btn'
                        onClick={handleGitHubSignIn}
                    >
                        Sign In with GitHub
                        <Image src={'/assets/github.svg'} width={20} height={20} alt='GitHub'/>
                  </button>
              </div>
          </form>
          <p className='text-center text-gray-400'>
              don't have an account Yet?
              <Link href={'/register'} className='text-blue-700'> SignUp</Link>
          </p>
    </section>
  )
}

export default LoginPage