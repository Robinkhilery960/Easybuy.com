
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, loadShopProducts } from '../../redux/slice/product'
import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { Button } from '@material-ui/core'
import Loader from '../layout/Loader'
import { DataGrid } from '@material-ui/data-grid'
import { Link } from 'react-router-dom'
import { loadAllOrders } from '../../redux/slice/order'
 
const AdminAllOrders = () => { 
    const { allOrders, allOrdersLoadings } = useSelector(state => state.order)

    const dispatch = useDispatch()


    // const handleDelete = (id) => {
    //     dispatch(deleteProduct(id))
    // }

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 150,
            flex: 0.7,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
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
                );
            },
        },
    ];


    const row = []
    allOrders && allOrders.forEach((order) => {
        row.push({
            id: order?._id,
            itemsQty: order?.cart?.length,
            status: order?.status,
            total: order?.totalPrice
        })
    })


    useEffect(() => {
        dispatch(loadAllOrders())
    }, [])

    return (
        <>
            {
                allOrdersLoadings ? (<Loader />) : (
                    <div className="w-full  bg-white">
                        <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                    </div>
                )
            }
        </>
    )
}

export default AdminAllOrders