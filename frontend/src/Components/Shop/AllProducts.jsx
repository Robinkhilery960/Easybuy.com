import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, loadShopProducts } from '../../redux/slice/product'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { Button } from '@material-ui/core'
import Loader from '../layout/Loader'
import { DataGrid } from '@material-ui/data-grid'
import { Link } from 'react-router-dom'

const AllProducts = () => {
    const { shop } = useSelector(state => state.shop)
    const { products,allProductLoading, deleteProductLoading} = useSelector(state => state.product)

    const dispatch = useDispatch()

    
    const handleDelete = (id)=>{
        dispatch(deleteProduct(id))
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
                const d = params.row.name
                const product_name = d.replace(/\s+/g, "-")
                return (
                    <>
                        <Link to={`/product/${product_name}`}>
                            <Button>
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
                            <AiOutlineDelete size={20}  onClick={()=>handleDelete(params.id)}/>
                        </Button>
                    </>
                )
            }
        },

    ]


    const row=[]
    products && products.forEach((product)=>{
        row.push({
            id:product._id,
            name:product.name,
            price:"US$" + product.discountPrice,
            stock:product.stock,
            sold:10
        })
    })


    useEffect(() => {
        dispatch(loadShopProducts(shop._id))
    }, [deleteProductLoading])

    return (
        <>
        {
            allProductLoading ? (<Loader/>) :(
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
                    <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                </div>
            )
        }
        </>
    )
}

export default AllProducts