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


const AdminAllUsers = () => {
  const { allUsers, isLoading } = useSelector(state => state.user)
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState(null)
  const dispatch = useDispatch()


  const handleDelete = (id) => {
    axios.delete(`${server}/user/delete-user/${id}`, {
      withCredentials: true,
    }).then((res) => {
      toast.success("User deleted successfully")
      dispatch(loadAllUsers())
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
      field: "role",
      headerName: "User Role",
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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete User",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setOpen(true) || setUserId(params.id)} >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = []
  allUsers && allUsers.forEach((user) => {
    row.push({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      joinedAt: user.createdAt.slice(0, 10)
    })
  })


  useEffect(() => {
    !allUsers && dispatch(loadAllUsers())
  }, [dispatch])

  return (
    <>
      {
        isLoading ? (<Loader />) : (
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
                        onClick={() => setOpen(false) || handleDelete(userId)}
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

export default AdminAllUsers