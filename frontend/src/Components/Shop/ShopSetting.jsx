import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backend_url, server } from '../../server'
import { AiOutlineCamera } from 'react-icons/ai'
import styles from '../../Styles/style'
import { toast } from 'react-toastify'
import axios from 'axios'
import { loadShop } from '../../redux/slice/shop'

const ShopSetting = () => {
    const { shop } = useSelector((state) => state.shop)
    const [avatar, setAvatar] = useState(null)
    const [name, setName] = useState(shop?.name ? shop.name : "")
    const [phoneNumber, setPhoneNumber] = useState(shop?.phoneNumber ? shop.phoneNumber : null)
    const [zipCode, setZipCode] = useState(shop?.zipCode ? shop.zipCode : null)
    const [description, setDescription] = useState(shop?.description ? shop.description : "")
    const [address, setAddress] = useState(shop?.address ? shop.address : "")

    const dispatch = useDispatch()


    const handleFileInutChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const newForm = new FormData();
        newForm.append("name", name);
        newForm.append("address", address);
        newForm.append("description", description);
        newForm.append("phoneNumber", phoneNumber);
        newForm.append("zipCode", zipCode);
        newForm.append("image", avatar);

        await axios.put(`${server}/shop/updateshop`, newForm, {
            withCredentials: true,
        }).then(res => {
            toast.success("Shop updated successfully")
            dispatch(loadShop())
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    };

    return (

        <div className='flex flex-col w-[50%]'>

            <div className="flex justify-center w-full ">
                <div className="relative">
                    <img
                        src={
                            avatar
                                ? URL.createObjectURL(avatar)
                                : `${backend_url}` + shop?.avatar
                        }
                        className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                        alt=""
                    />

                    <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                        <label htmlFor="image" className=" ">
                            <span>
                                <AiOutlineCamera />{" "}
                            </span>
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept=".jpg ,.jpeg, .png"
                            onChange={handleFileInutChange}
                            className="sr-only hidden"
                        />
                    </div>
                </div>
            </div>

            <br />
            <br />

            <div className="w-[100%] px-5">
                <form onSubmit={handleSubmit} area-required={true}>
                    <div className="   800px:flex block  flex-col  pb-3">
                        <div className=" w-[100%]  ">
                            <label className="block pb-2 ">Full Name</label>
                            <input
                                type="text"
                                className={`${styles.input} !w-[95%]`}
                                require
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="w-[100%] ">
                            <label className="block pb-2  800px:pt-0 pt-2 ">Description</label>
                            <input
                                type="text"
                                className={`${styles.input} !w-[95%]`}
                                require
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div  >
                            <label className="block pb-2 ">Phone Number</label>
                            <input
                                type="number "
                                className={`${styles.input} !w-[95%]`}
                                require
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div  >
                            <label className="block pb-2 ">Address</label>
                            <input
                                type="text"
                                className={`${styles.input} !w-[95%]`}
                                require
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div  >
                            <label className="block pb-2 ">ZipCode</label>
                            <input
                                type="number"
                                className={`${styles.input} !w-[95%]`}
                                require
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                            />
                        </div>
                    </div>


                    <input
                        type="submit"
                        className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                        required
                        value="Update"
                    />
                </form>
            </div>        </div>
    )
}

export default ShopSetting