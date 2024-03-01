
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, loadAllProducts, loadShopProducts } from '../../redux/slice/product'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { Button } from '@material-ui/core'
import Loader from '../layout/Loader'
import { DataGrid } from '@material-ui/data-grid'
import { Link } from 'react-router-dom'
import { server } from '../../server'
import { toast } from 'react-toastify'
import axios from 'axios'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../Styles/style'

const AdminAllProducts = () => {
    const { shop } = useSelector(state => state.shop)
    const { allProducts, allProductLoading, deleteProductLoading } = useSelector(state => state.product)
    const [productId, setProductId] = useState(null)
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()


    const handleDelete = (id) => {
        axios.delete(`${server}/product/delete-product/${id}`, {
            withCredentials: true,
        }).then((res) => {
            toast.success("Product deleted successfully")
            dispatch(loadAllProducts())
        }).catch((error) => {
            console.log(error)

            toast.error(error.response.data.message)
        })
    }

    const columns = [
        {
            field: "id",
            headerName: "Product Id",
            minWidth: 150,
            flex: 0.7
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 1.4
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 100,
            flex: 0.9
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 100,
            flex: 0.8
        },
        {
            field: "sold",
            headerName: "Sold out",
            type: "number",
            minWidth: 130,
            flex: 0.6
        },
        {
            field: "Preview",
            headerName: "",
            type: "number",
            minWidth: 100,
            flex: 0.8,
            sortable: false,
            renderCell: (params) => {
                const id = params.row.id
                return (
                    <>
                        <Link to={`/product/${id}`}>
                            <Button onClick={() => setOpen(true) || setProductId(params.id)}>
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                )
            }
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
    allProducts && allProducts.forEach((product) => {
        row.push({
            id: product._id,
            name: product.name,
            price: "US$" + product.discountPrice,
            stock: product.stock,
            sold: product.sold_out
        })
    })


    useEffect(() => {
        dispatch(loadAllProducts)
    }, [deleteProductLoading])

    return (
        <>
            {
                allProductLoading ? (<Loader />) : (
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
                                            Are you sure you wanna delete this Product?
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
                                                onClick={() => setOpen(false) || handleDelete(productId)}
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

export default AdminAllProducts