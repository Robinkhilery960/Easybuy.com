import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { Button } from '@material-ui/core'
import Loader from '../layout/Loader'
import { DataGrid } from '@material-ui/data-grid'
import { Link } from 'react-router-dom'
import { deleteEvent, loadAllShopsEvents } from '../../redux/slice/event'
import { toast } from 'react-toastify'

const AdminAllEvents = () => {
    const { allEvents, allShopsEventsLoading } = useSelector(state => state.event)

    const dispatch = useDispatch()



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
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/product/${params.id}?isEvent=true`}>
                            <Button>
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                )
            }
        },


    ]


    const row = []
    allEvents && allEvents.forEach((event) => {
        row.push({
            id: event._id,
            name: event.name,
            price: "US$" + event.discountPrice,
            stock: event.stock,
            sold: 10
        })
    })


    useEffect(() => {
        dispatch(loadAllShopsEvents())
    }, [dispatch])

    return (
        <>
            {
                allShopsEventsLoading ? (<Loader />) : (
                    <div className="w-full mx-8 pt-1 mt-10 bg-white">
                        <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
                    </div>
                )
            }
        </>
    )
}

export default AdminAllEvents