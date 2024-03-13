import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx"
import axios from "axios"
import { toast } from 'react-toastify';
import styles from '../Styles/style';
import { server } from '../server';

const CreateShop = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate()

    const handleFileInutChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${server}/shop/create-shop`, { name, email, password, phoneNumber, zipCode, address, avatar }).then((res) => {
            toast.success(res.data.message)
            setName("")
            setEmail("")
            setPassword("")
            setAvatar(null)
            setPhoneNumber("")
            setAddress("")
            // navigate("/login")
        }).catch((err) => { toast.error(err?.response?.data?.message) })



    }


    return (
        <div className='min-h-screen flex flex-col   justify-center items-center py-12 sm:px-6 lg:px-8  
        bg-gray-50'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md '>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register your new shop
                </h2>
            </div>
            <div className='mt-8 sm:w-full sm:max-w-md   '>
                <div className="bgwhite py-8 px-4 shadow sm:ronded-lg sm:px10">
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-700 '>Shop Name</label>
                            <div className="mt-1">
                                <input type="text" name='name' id="name"
                                    autoComplete='email' required value={name} onChange={(e) => setName(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
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
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700 '>Phone Number</label>
                            <div className="mt-1">
                                <input type="number" name='phone-number' id="phone-number"
                                    autoComplete='email' required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
                                focus:border-blue-500 sm:text-sm' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700 '>Address</label>
                            <div className="mt-1">
                                <input type="text" name='address' id="address"
                                    autoComplete='email' required value={address} onChange={(e) => setAddress(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
                                focus:border-blue-500 sm:text-sm' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700 '>Zip Code</label>
                            <div className="mt-1">
                                <input type="number" name='zipcode' id="zipcode"
                                    autoComplete='email' required value={zipCode} onChange={(e) => setZipCode(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500
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
                                    {avatar ? <img src={avatar} alt="avatar" className='h-full w-full  rounded-full overflow-hidden' /> : <RxAvatar className="h-8 w-8" />}
                                </span>
                                <label htmlFor="file-input" className='ml-5 flex items-center justify-center px-4  py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-500'>
                                    <span>Upload File</span>
                                    <input type="file" name="avatar" id="file-input" accept='.jpg ,.jpeg, .png' onChange={handleFileInutChange}
                                        className='sr-only' />
                                </label>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'> Submit </button>
                        </div>

                        <div className={`${styles.normalFlex} w-full`}>
                            <h4>Already have an shop ?</h4>
                            <Link to="/login-shop" className='text-blue-600 pl-2'> Sign in</Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreateShop