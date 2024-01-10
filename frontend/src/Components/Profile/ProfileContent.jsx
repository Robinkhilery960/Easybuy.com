import React, { useEffect, useState } from 'react'
import { backend_url } from '../../server'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineTrackChanges } from 'react-icons/md'

import styles from '../../Styles/style'
import { Link } from 'react-router-dom'
import { Button } from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"
import { updateUser } from '../../redux/slice/user'
import { toast } from 'react-toastify'


const ProfileContent = ({ active }) => {
    const { user, isError } = useSelector(state => state.user)
    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber)
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState(null);

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const newForm = new FormData()
        newForm.append("name", name)
        newForm.append("email", email)
        newForm.append("password", password)
        newForm.append("phoneNumber", phoneNumber)
        newForm.append("image", avatar) 
        dispatch(updateUser(newForm))
    }

    const handleFileInutChange = (e) => {
        const file = e.target.files[0]
        setAvatar(file)
    }

    useEffect(() => {
        if (isError) {
            toast.error("Invalid credentials")
        }
    }, [isError])

    return (
         <div className='w-full'>
            {/* Profile    */}
            {
                active === 1 && (
                    <>
                        <div className="flex justify-center w-full">
                            <div className="relative">

                                <img
                                    src={avatar ? URL.createObjectURL(avatar) : `${backend_url}` + user?.avatar}
                                    className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]" alt=""
                                />

                                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                                    <label htmlFor="image" className=' '>
                                        <span><AiOutlineCamera /> </span>
                                    </label>
                                    <input type="file" name="image" id="image" accept='.jpg ,.jpeg, .png' onChange={handleFileInutChange}
                                        className='sr-only hidden' />

                                </div>


                            </div>
                        </div>

                        <br />
                        <br />

                        <div className='w-full px-5'>
                            <form onSubmit={handleSubmit} area-required={true} >
                                <div className="w-full  800px:flex block   pb-3">
                                    <div className=" w-[100%] 800px:w-[50%]">

                                        <label className='block pb-2 '>Full Name</label>
                                        <input type="text" className={`${styles.input} !w-[95%]`} require value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>

                                    <div className="w-[100%] 800px:w-[50%]">

                                        <label className='block pb-2  800px:pt-0 pt-2 '>Email</label>
                                        <input type="email" className={`${styles.input} !w-[95%]`} require value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div className="w-full  800px:flex block  pb-5">
                                    <div className="w-[100%] 800px:w-[50%]">

                                        <label className='block pb-2 '>Phone Number</label>
                                        <input type="number " className={`${styles.input} !w-[95%]`} require value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>

                                    <div className="w-[100%] 800px:w-[50%]">
                                        <label className='block pb-2 '>Password</label>
                                        <input type="password" className={`${styles.input} !w-[95%]`} require value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>


                                </div>


                                <input type="submit" className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`} required value="Update" />
                            </form>
                        </div>
                    </>
                )
            }

            {/* order    */}
            {
                active === 2 && (
                    <div><AllOrders /></div>
                )
            }

            {/* refund    */}
            {
                active === 3 && (
                    <div><AllRefundOrders /></div>
                )
            }

            {/* track order    */}
            {
                active === 5 && (
                    <div><TrackOrder /></div>
                )
            }

            {/* payment method    */}
            {
                active === 6 && (
                    <div><PaymentMethod /></div>
                )
            }

            {/*Adddress  */}
            {
                active === 7 && (
                    <div><Address /></div>
                )
            }
        </div>
    )
}

const AllOrders = () => {
    const orders = [
        {
            _id: "876rtdvg2ifg2iubd283",
            orderItems: [
                {
                    name: "Iphone 14 pro max"
                },
            ],
            totalPrice: 120,
            orderStatus: "Processing",
        },

    ]

    const columns = [

        {
            field: "id",
            headerName: "Order ID",
            minWidth: 150,
            flex: 0.7
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            minWidth: 130,
            flex: 0.7,

        },
        {
            field: "total",
            headerName: "Total",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: " ",
            flex: 1,
            headerName: " ",
            minWidth: 150,
            type: "number",
            sortable: false,

            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                )
            }
        }

    ]

    const row = []

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$" + item.totalPrice,
            status: item.orderStatus
        })
    })
    return (
        <div className="pl-8 pt-1">
            <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
        </div>
    )
}

const AllRefundOrders = () => {
    const orders = [
        {
            _id: "876rtdvg2ifg2iubd283",
            orderItems: [
                {
                    name: "Iphone 14 pro max"
                },
            ],
            totalPrice: 120,
            orderStatus: "Processing",
        },

    ]

    const columns = [

        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {
            field: "status",
            headerName: "status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            minWidth: 130,
            flex: 0.7,

        },
        {
            field: "total",
            headerName: "Total",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: " ",
            flex: 1,
            headerName: " ",
            minWidth: 150,
            type: "number",
            sortable: false,

            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                )
            }
        }

    ]

    const row = []

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$" + item.totalPrice,
            status: item.orderStatus
        })
    })
    return (
        <div className="pl-8 pt-1">
            <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
        </div>
    )
}

const TrackOrder = () => {
    const orders = [
        {
            _id: "876rtdvg2ifg2iubd283",
            orderItems: [
                {
                    name: "Iphone 14 pro max"
                },
            ],
            totalPrice: 120,
            orderStatus: "Processing",
        },

    ]

    const columns = [

        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {
            field: "status",
            headerName: "status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            minWidth: 130,
            flex: 0.7,

        },
        {
            field: "total",
            headerName: "Total",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: " ",
            flex: 1,
            headerName: " ",
            minWidth: 150,
            type: "number",
            sortable: false,

            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/order/${params.id}`}>
                            <Button>
                                <MdOutlineTrackChanges size={20} />
                            </Button>
                        </Link>
                    </>
                )
            }
        }

    ]

    const row = []

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            total: "US$" + item.totalPrice,
            status: item.orderStatus
        })
    })
    return (
        <div className="pl-8 pt-1">
            <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
        </div>
    )
}

const PaymentMethod = () => {

    return (
        <div className='w-full px-5'>
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 " >
                    Payment Methods
                </h1>
                <div className={` ${styles.button}!rounded-md`}>
                    <span className='text-[#fff]'>
                        Add New
                    </span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
                <div className="flex items-center">
                    <img src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg" alt="" />
                    <h5 className="pl-5 font-[600]">Robin Khilery</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h6>123 **** **** ****</h6>
                    <h5 className="pl-6">08/2028</h5>
                </div>
                <div className="min-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete size={25} className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}


const Address = () => {

    return (
        <div className='w-full px-5'>
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 " >
                    My Address
                </h1>
                <div className={` ${styles.button}!rounded-md`}>
                    <span className='text-[#fff]'>
                        Add New
                    </span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
                <div className="flex items-center">

                    <h5 className="pl-5 font-[600]">Default</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h5 className="pl-6">495 Erdman Passage, New Zoietown, Paragway</h5>
                </div>
                <div className="pl-8 flex items-center">
                    <h5 className="pl-6"> (123) 840-9416</h5>
                </div>
                <div className="min-w-[10%] flex items-center justify-between pl-8">
                    <AiOutlineDelete size={25} className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}



export default ProfileContent 