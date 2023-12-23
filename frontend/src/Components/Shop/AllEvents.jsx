import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { Button } from '@material-ui/core'
import Loader from '../layout/Loader'
import { DataGrid } from '@material-ui/data-grid'
import { Link } from 'react-router-dom'
import { deleteEvent, loadAllEvents } from '../../redux/slice/event'

const AllEvents = () => {
    const { shop } = useSelector(state => state.shop)
    const { events, allEventsLoading, deleteEventLoading } = useSelector(state => state.event)

    const dispatch = useDispatch()


    const handleDelete = (id) => {
        dispatch(deleteEvent(id))
    }

    const columns = [
        {
            field: "id",
            headerName: "Event Id",
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
    events && events.forEach((event) => {
        row.push({
            id: event._id,
            name: event.name,
            price: "US$" + event.discountPrice,
            stock: event.stock,
            sold: 10
        })
    })


    useEffect(() => {
        dispatch(loadAllEvents(shop._id))
    }, [deleteEventLoading])

    return (
        <>
            {
                allEventsLoading ? (<Loader />) : (
                    <div className="w-full mx-8 pt-1 mt-10 bg-white">
                        <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                    </div>
                )
            }
        </>
    )
}

export default AllEvents