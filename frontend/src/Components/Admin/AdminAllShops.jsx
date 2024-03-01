
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllProducts, loadShopProducts } from '../../redux/slice/product'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'
import { Button } from '@material-ui/core'
import Loader from '../layout/Loader'
import { DataGrid } from '@material-ui/data-grid'
import { Link } from 'react-router-dom'
import { loadAllUsers } from '../../redux/slice/user'
import styles from "../../Styles/style";
import { server } from '../../server'
import { toast } from 'react-toastify';
import axios from "axios"
import { loadAllShops } from '../../redux/slice/shop'


const AdminAllShops = () => {
    const { allShops, isShopLoading } = useSelector(state => state.shop)
    const [open, setOpen] = useState(false)
    const [shopId, setShopId] = useState(null)
    const dispatch = useDispatch()


    const handleDelete = (id) => {
        axios.delete(`${server}/shop/delete-shop/${id}`, {
            withCredentials: true,
        }).then((res) => {
            toast.success("Shop deleted successfully")
            dispatch(loadAllShops())
        }).catch((error) => {
            console.log(error)
            toast.error(error.response.data.message)
        })
    }

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },

        {
            field: "name",
            headerName: "name",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "email",
            headerName: "Email",
            type: "text",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "joinedAt",
            headerName: "joinedAt",
            type: "text",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: "Preview",
            headerName: "",
            type: "number",
            minWidth: 100,
            flex: 0.8,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/shop/preview/${params.id}`}>
                            <Button>
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                )
            }
        },
        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "Delete User",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => setOpen(true) || setShopId(params.id)} >
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                );
            },
        },
    ];

    const row = []
    allShops && allShops.forEach((shop) => {
        row.push({
            id: shop._id,
            name: shop.name,
            email: shop.email,
            joinedAt: shop.createdAt.slice(0, 10)
        })
    })


    useEffect(() => {
        !allShops && dispatch(loadAllShops())
    }, [dispatch])

    return (
        <>
            {
                isShopLoading ? (<Loader />) : (
                    <div className="w-full mx-8 pt-1 mt-10 bg-white">
                        <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                        {
                            open && (
                                <div className='w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen'>
                                    <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded  shadow p-5">
                                        <div className="w-full flex justify-end cursor-pointer">
                                            <RxCross1 size={25} onClick={() => setOpen(false)} />
                                        </div>
                                        <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                                            Are you sure you wanna delete this user?
                                        </h3>
                                        <div className="w-full flex items-center justify-center">
                                            <div
                                                className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                                                onClick={() => setOpen(false)}
                                            >
                                                cancel
                                            </div>
                                            <div
                                                className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                                                onClick={() => setOpen(false) || handleDelete(shopId)}
                                            >
                                                confirm
                                            </div>
                                        </div>
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
export default AdminAllShops