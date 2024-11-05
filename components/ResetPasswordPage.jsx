'use client'

import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
import { useRouter } from "next/navigation";



const ResetPasswordPage = () => {
    const router = useRouter();
    const [show , setShow] = useState({
      password:false,
      cPassword:false
    })
    const [validOTP, setValidOTP] = useState(false)
    const [password, setPassword] = useState('')
    const [cPassword , setCPassword] = useState('')
    const [Otp, setOtp] = useState('')
    const [emailSent , setEmailSent] = useState(false)
    const [ConfirmOTP , setConfirmOTP] = useState()
    const [user, setUser] = useState(
        {
            email: '',
        }
    )
    const [message, setMessage] = useState('')



    const handleSendEmail = async () => {
        try {
            const dataToSend = {
                email: user.email,
                sendEmail: true
            }
            const response = await fetch('/api/reset', {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            const data = await response.json()
            if (response.status === 200) {
                setConfirmOTP(data.ResetUser.OTP)
                setEmailSent(true)
            } else {
                setMessage(data.message)
            }

            } catch (error) {
            console.log(error);
            }
    }


    const handleValidateOTP = async () => {
        if (Otp === ConfirmOTP) {
            setValidOTP(true)
        } else {
            setMessage("Invalid OTP")
        }
    }

    const handleResetPassword = async () => { 
        if (password === cPassword) {     
            try {
                const dataToSend = {
                    email: user.email,
                    sendEmail: false,
                    password: password,
                }
                const response = await fetch('/api/reset', {
                    method: 'PATCH',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                })
                const data = await response.json()
                if (response.status === 200) {
                    console.log(data)
                    router.push('/login')
                } else {
                    setMessage(data.message)
                }
                } catch (error) {
                console.log(error);
                }
        } else {
            setMessage("Password does not match")
        }
    }

    return (
      <section className='w-3/4 mx-auto flex flex-col gap-10 text-center '>
          <div className='flex flex-col gap-4'>
              <h1 className='text-gray-800 text-4xl font-bold '>Reset</h1>
              <p className='w-3/4 mx-auto text-gray-400'>
                  Reset your password here
              </p>
          </div>
            <form className='flex flex-col gap-5' >
                {!emailSent &&
                    <div className='input_field'>
                        <input type="email" name='email' placeholder='email' value={user.email}
                            onChange={(e) => { setUser({ ...user, email: e.target.value }); setMessage("") }} className='text-black'
                        />
                        <span className='text-[#CBD5E1] flex items-center px-4 hover:text-[#6366f1]'>
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                }
                {(emailSent && !validOTP) &&
                    <div className='input_field'>
                        <input type="text" name='OTP' placeholder='OTP' value={Otp}
                            onChange={(e) => setOtp(e.target.value)} className='text-black'
                        />
                        <span className='text-[#CBD5E1] flex items-center px-4 hover:text-[#6366f1]'>
                            <HiFingerPrint size={25} />
                        </span>
                    </div>
                }
                {validOTP &&
                    <>                    
                        <div className='input_field'>
                            <input type={show.password ? 'text' : 'password'} name='password' placeholder='Password' value={password}
                                onChange={(e) => setPassword(e.target.value)} className='text-black'
                            />
                            <span className='text-[#CBD5E1] flex items-center px-4 hover:text-[#6366f1]' onClick={() => setShow({...show,password:!show.password})}>
                                <HiFingerPrint size={25} />
                            </span>
                        </div>
                        <div className='input_field'>
                            <input type={show.cPassword ? 'text' : 'password'} name='cPassword' placeholder='Confirm Password' value={cPassword}
                                onChange={(e) => setCPassword(e.target.value)} className='text-black'
                            />
                            <span className='text-[#CBD5E1] flex items-center px-4 hover:text-[#6366f1]' onClick={() => setShow({...show,cPassword:!show.cPassword})}>
                                <HiFingerPrint size={25} />
                            </span>
                        </div>
                    </>
                }
            {
              message && (
              <div className="mt-3">
                <p className="font-poppins text-red-600 text-left">
                  {message}
                </p>
              </div>  
            )}
                {!emailSent && <div>
                    <button type='button' className='blue_btn' onClick={handleSendEmail}>
                        Send Email
                    </button>
                </div> }
                {(emailSent && !validOTP) &&  <div>
                    <button type='button' className='blue_btn' onClick={handleValidateOTP}>
                        Validate OTP
                    </button>
                </div>}
                {validOTP &&  <div>
                    <button type='button' className='blue_btn' onClick={handleResetPassword}>
                        Reset Password
                    </button>
                </div>}
            </form>
    </section>
  )
}


export default ResetPasswordPage