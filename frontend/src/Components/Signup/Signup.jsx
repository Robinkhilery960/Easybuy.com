import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import styles from "../../Styles/style"
import { Link } from 'react-router-dom';
import {RxAvatar} from "react-icons/rx"
const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const handleSubmit=()=>{
        console.log("first")
    }

    const handleFileInutChange=(e)=>{
        const file=e.target.files[0]
        setAvatar(file)
    }
    return (
        <div className='min-h-screen flex flex-col   justify-center items-center py-12 sm:px-6 lg:px-8  
        bg-gray-50'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md '>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register as a new user
                </h2>
            </div>
            <div className='mt-8 sm:w-full sm:max-w-md   '>
                <div className="bgwhite py-8 px-4 shadow sm:ronded-lg sm:px10">
                    <form className='space-y-6'>
                        <div>
                            <label htmlFor="fullName" className='block text-sm font-medium text-gray-700 '>Full Name </label>
                            <div className="mt-1">
                                <input type="text" name='fullName' id="fullName"
                                    autoComplete='email' required value={fullName} onChange={(e) => setFullName(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
                                focus:border-blue-500 sm:text-sm' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700 '>Email address</label>
                            <div className="mt-1">
                                <input type="email" name='email' id="email"
                                    autoComplete='email' required value={email} onChange={(e) => setEmail(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
                                focus:border-blue-500 sm:text-sm' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-700 '>Password</label>
                            <div className="mt-1 relative">
                                <input type={visible ? "text" : "password"} name='password' id="password"
                                    autoComplete='current-password' required value={password} onChange={(e) => setPassword(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
                                focus:border-blue-500 sm:text-sm' />
                                {
                                    visible ? (<AiOutlineEye className="absolute right-2 top-2 cursor-pointer" size={25} onClick={() => setVisible(false)} />) :
                                        (<AiOutlineEyeInvisible className="absolute right-2 top-2 cursor-pointer" size={25} onClick={() => setVisible(true)} />)
                                }

                            </div>
                        </div>
                        <div>
                            <label htmlFor="avatar" className='block text-sm font-medium text-gray-700'>

                            </label>
                            <div className='mt2 flex items-center'>
                                <span className='inline-block h-8 w-8 rounded-full overflow-hidden '>
                                    {avatar?<img src={URL.createObjectURL(avatar)} alt="avatar" className='h-full w-full  rounded-full overflow-hidden' />: <RxAvatar className="h-8 w-8"/>}
                                </span>
                                <label htmlFor="file-input" className='ml-5 flex items-center justify-center px-4  py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-500'>
                                    <span>Upload File</span>
                                    <input type="file" name="avatar" id="file-input" accept='.jpg ,.jpeg, .png' onChange={handleFileInutChange}
                                    className='sr-only'/>
                                </label>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'> Submit </button>
                        </div>

                        <div className={`${styles.normalFlex} w-full`}>
                            <h4>Already have an account ?</h4>
                            <Link to="/login" className='text-blue-600 pl-2'> Sign in</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup