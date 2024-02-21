import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'

import { Button } from '@material-ui/core'
import Loader from '../layout/Loader'
import { DataGrid } from '@material-ui/data-grid'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../../Styles/style'
import axios from 'axios'
import { server } from '../../server'
import { toast } from 'react-toastify'




const AllCoupons = () => {
    const { shop } = useSelector(state => state.shop)
    const { shopProducts } = useSelector(state => state.product)
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [value, setValue] = useState("")
    const [minAmount, setMinAmount] = useState("")
    const [maxAmount, setMaxAmount] = useState("")
    const [selectProduct, setSelectProduct] = useState("")
    const [couponCodes, SetCouponCodes] = useState([])
    const navigate = useNavigate()




    const columns = [
        {
            field: "name",
            headerName: "Coupon Code",
            minWidth: 150,
            flex: 0.7
        },
        {
            field: "id",
            headerName: "ID",
            minWidth: 100,
            flex: 0.7
        },
        {
            field: "minAmount",
            headerName: "Min Amount",
            minWidth: 100,
            flex: 1.0
        },
        {
            field: "maxAmount",
            headerName: "Max Amount",
            minWidth: 100,
            flex: 0.9
        },
        {
            field: "shopId",
            headerName: "ShopId",
            type: "number",
            minWidth: 150,
            flex: 0.8
        },
        {
            field: "Preview",
            headerName: "",
            type: "number",
            minWidth: 100,
            flex: 0.8,
            sortable: false,
            // renderCell: (params) => {
            //     const d = params.row.name
            //     const product_name = d.replace(/\s+/g, "-")
            //     return (
            //         <>
            //             <Link to={`/product/${product_name}`}>
            //                 <Button>
            //                     <AiOutlineEye size={20} />
            //                 </Button>
            //             </Link>
            //         </>
            //     )
            // }
        },
        {
            field: "Delete",
            headerName: "",
            type: "number",
            minWidth: 120,
            flex: 0.8,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button>
                            <AiOutlineDelete size={20} onClick={() => handleDelete(params.id)} />
                        </Button>
                    </>
                )
            }
        },

    ]


    const row = []
    couponCodes && couponCodes.forEach((couponCode) => {
        row.push({
            id: couponCode._id,
            name: couponCode.name,
            minAmount: "US$ " + couponCode.minAmount,
            maxAmount: "US$ " + couponCode.maxAmount,
            shopId: couponCode.shopId,
        })
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post(
            `${server}/couponCode/create-couponCode`, { name, minAmount, value, maxAmount, shopId: shop._id, selectProduct, shop }, { withCredentials: true }).then((res) => {
                toast.success("Coupon code created successfully")
                setOpen(false)
                loadAllCouponCodes()
            }).catch((error) => {
                toast.error(error.response.data.message)
            })

    }



    const loadAllCouponCodes = async () => {
        await axios.get(
            `${server}/couponCode/get-all-couponCode/${shop._id}`, { withCredentials: true }).then((res) => {
                const { couponCodes } = res.data
                SetCouponCodes(couponCodes)

                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleDelete = async (id) => {
        await axios.delete(
            `${server}/couponCode/delete-couponCode/${id}`, { withCredentials: true }).then((res) => {
                const { message } = res.data
                toast.success(message)
                loadAllCouponCodes()

            }).catch((error) => {
                toast.error(error.response.data.message)
            })
    }



    useEffect(() => {
        loadAllCouponCodes()
    }, [])

    return (
        <>
            {
                (
                    <div className="w-full mx-8 pt-1 mt-10 bg-white">
                        <div className="w-full flex justify-end " onClick={() => setOpen(true)}>
                            <div className={`${styles.button} text-white !w-max !h-[45px] px-3 !rounded-[5px] mr-3 `}>Create Coupon Code</div>
                        </div>

                        <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                        {
                            open && (
                                <div className='fixed top-0 left-0 w-full h-screen bg-[#0000006e]   z-[120] flex items-center justify-center'>
                                    <div className='w-[90%] 800px:w-[45%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll  '>
                                        <div className="w-full flex justify-end">
                                            <RxCross1 size={30} className='cursor-pointer' onClick={() => setOpen(false)} />
                                        </div>
                                        <h5 className="text-[30px] font-Poppins text-center">Create Coupon Code</h5>
                                        {/* Create product form */}
                                        <form onSubmit={handleSubmit} >
                                            <br />
                                            <div>
                                                <label className='pb-2'
                                                >Name <span className="text-red-500">
                                                        *</span></label>
                                                <input type="text" name='name' id='name' value={name} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setName(e.target.value)} placeholder='Enter your Coupon Code name..... ' />
                                            </div>
                                            <br />
                                            <div>
                                                <label className='pb-2'
                                                >Value </label>
                                                <input type="number" name='price' id='price' value={value} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setValue(e.target.value)} placeholder='Enter your  coupon code value..... ' />
                                            </div>
                                            <br />
                                            <div>
                                                <label className='pb-2'
                                                >Minimum Amount <span className="text-red-500">
                                                        *</span> </label>
                                                <input type="number" name='price' id='price' value={minAmount} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setMinAmount(e.target.value)} placeholder='Enter your  coupon code minimum amount..... ' />
                                            </div>
                                            <br />
                                            <div>
                                                <label className='pb-2'
                                                >Maximum Amount <span className="text-red-500">
                                                        *</span> </label>
                                                <input type="number" name='price' id='price' value={maxAmount} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setMaxAmount(e.target.value)} placeholder='Enter your  coupon code maximum amount..... ' />
                                            </div>
                                            <br />
                                            <div>
                                                <label className='pb-2'
                                                >Select Product </label>
                                                <select className='w-full mt-2 border h-[35px] rounded-[5px] ' value={selectProduct} onChange={(e) => setSelectProduct(e.target.value)}>
                                                    <option value="choose a category">Choose a Product</option>
                                                    {
                                                        shopProducts && shopProducts.map((product) => (
                                                            <option value={product.name} key={product._id}>{product.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <br />
                                            <div>
                                                <input type="submit" value="Create" className='mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' />
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default AllCoupons