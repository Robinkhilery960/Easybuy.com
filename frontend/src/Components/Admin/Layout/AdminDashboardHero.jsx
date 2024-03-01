import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { loadAllProducts } from "../../../redux/slice/product";
import { loadAllOrders } from "../../../redux/slice/order";
import styles from "../../../Styles/style";

const AdminDashboardHero = () => {
    const { allProducts } = useSelector(state => state.product)
    const { allOrders } = useSelector(state => state.order)
    const { shop } = useSelector(state => state.shop)
    const dispatch = useDispatch();

    const deliveredOrders = allOrders && allOrders.filter((order) => (order.status === "Delivered"))
    const collectedMoney = deliveredOrders && deliveredOrders.length > 0 && deliveredOrders.reduce((acc, order) => (acc + order.totalPrice), 0)
    const moneyAfterServiceCharge = collectedMoney * .1
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
        dispatch(loadAllProducts())
        dispatch(loadAllOrders())
    }, [])

    return (
        <div className="w-full p-8">
            <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
            <div className="w-full block 800px:flex items-center justify-between">
                <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        <AiOutlineMoneyCollect
                            size={30}
                            className="mr-2"
                            fill="#00000085"
                        />
                        <h3
                            className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                        >
                            Account Balance{" "}
                            <span className="text-[16px]">(with 10% service charge)</span>
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">${moneyAfterServiceCharge.toFixed(2)}</h5>
                    <Link to="/admin-withdraw-money">
                        <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
                    </Link>
                </div>

                <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                        <h3
                            className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                        >
                            All Orders
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{allOrders && allOrders.length}</h5>
                    <Link to="/admin-orders">
                        <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
                    </Link>
                </div>

                <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                    <div className="flex items-center">
                        <AiOutlineMoneyCollect
                            size={30}
                            className="mr-2"
                            fill="#00000085"
                        />
                        <h3
                            className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                        >
                            All Products
                        </h3>
                    </div>
                    <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{allProducts && allProducts.length}</h5>
                    <Link to="/admin-products">
                        <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
                    </Link>
                </div>
            </div>
            <br />
            <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
            <div className="w-full min-h-[45vh] bg-white rounded">
                <DataGrid
                    rows={row}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                />
            </div>
        </div>
    )
}

export default AdminDashboardHero