import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import {
    AiOutlineArrowRight,
    AiOutlineCamera,
    AiOutlineDelete,
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from "react-icons/ai";
import { MdOutlineTrackChanges, MdTrackChanges } from "react-icons/md";
import { Country, State, City } from "country-state-city";
import styles from "../../Styles/style";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { clearErrors, deleteUserAddress, updateUser, updateUserAddress } from "../../redux/slice/user";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { loadUserOrders } from "../../redux/slice/order";

const ProfileContent = ({ active }) => {
    const { user, isError } = useSelector((state) => state.user);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault(); 
        dispatch(updateUser({name, email,password, phoneNumber, avatar}));
    };

    const handleFileInutChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
            }
        }; 
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        if (isError) {
            toast.error(isError);
            dispatch(clearErrors())
        }
    }, [isError]);

    return (
        <div className="w-full">
            {/* Profile    */}
            {active === 1 && (
                <>
                    <div className="flex justify-center w-full">
                        <div className="relative">
                            <img
                                src={
                                    avatar
                                        ? avatar
                                        : user?.avatar?.url
                                }
                                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                                alt=""
                            />

                            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                                <label htmlFor="image" className=" ">
                                    <span>
                                        <AiOutlineCamera />{" "}
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept=".jpg ,.jpeg, .png"
                                    onChange={handleFileInutChange}
                                    className="sr-only hidden"
                                />
                            </div>
                        </div>
                    </div>

                    <br />
                    <br />

                    <div className="w-full px-5">
                        <form onSubmit={handleSubmit} area-required={true}>
                            <div className="w-full  800px:flex block   pb-3">
                                <div className=" w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2 ">Full Name</label>
                                    <input
                                        type="text"
                                        className={`${styles.input} !w-[95%]`}
                                        require
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2  800px:pt-0 pt-2 ">Email</label>
                                    <input
                                        type="email"
                                        className={`${styles.input} !w-[95%]`}
                                        require
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="w-full  800px:flex block  pb-5">
                                <div className="w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2 ">Phone Number</label>
                                    <input
                                        type="number "
                                        className={`${styles.input} !w-[95%]`}
                                        require
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>

                                <div className="w-[100%] 800px:w-[50%]">
                                    <label className="block pb-2 ">Password</label>
                                    <input
                                        type="password"
                                        className={`${styles.input} !w-[95%]`}
                                        require
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <input
                                type="submit"
                                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                                required
                                value="Update"
                            />
                        </form>
                    </div>
                </>
            )}

            {/* order    */}
            {active === 2 && (
                <div>
                    <AllOrders user={user} />
                </div>
            )}

            {/* refund    */}
            {active === 3 && (
                <div>
                    <AllRefundOrders />
                </div>
            )}

            {/* track order    */}
            {active === 5 && (
                <div>
                    <TrackOrder />
                </div>
            )}

            {/* payment method    */}
            {active === 6 && (
                <div>
                    <ChangePassword />
                </div>
            )}

            {/*Adddress  */}
            {active === 7 && (
                <div>
                    <Address />
                </div>
            )}
        </div>
    );
};

const AllOrders = ({ user }) => {
    const { userOrders } = useSelector((state) => state.order);
    const dispatch = useDispatch()

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
                        <Link to={`/user/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = [];

    userOrders &&
        userOrders.forEach((item) => {
            row.push({
                id: item._id,
                itemsQty: item.cart?.length,
                total: "US$" + item.totalPrice,
                status: item?.status,
            });
        });

    useEffect(() => {
        dispatch(loadUserOrders(user._id))
    }, [])
    return (
        <div className="pl-8 pt-1">
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
};

const AllRefundOrders = () => {
    const { userOrders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch()

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
                        <Link to={`/user/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = [];

    userOrders &&
        userOrders.forEach((item) => {
            if (item.status === "Processing refund") {
                row.push({
                    id: item._id,
                    itemsQty: item.cart?.length,
                    total: "US$" + item.totalPrice,
                    status: item?.status,
                });
            }

        });

    useEffect(() => {
        dispatch(loadUserOrders(user._id))
    }, [])
    return (
        <div className="pl-8 pt-1">
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
};

const TrackOrder = () => {
    const { userOrders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch()

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
                        <Link to={`/user/track/order/${params.id}`}>
                            <Button>
                                <MdTrackChanges size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = [];

    userOrders &&
        userOrders.forEach((item) => {
            row.push({
                id: item._id,
                itemsQty: item.cart?.length,
                total: "US$" + item.totalPrice,
                status: item?.status,
            });
        });

    useEffect(() => {
        dispatch(loadUserOrders(user._id))
    }, [])
    return (
        <div className="pl-8 pt-1">
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    );
};

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [currentVisible, setCurrentVisible] = useState(false)
    const [newVisible, setNewVisible] = useState(false)
    const [confirmVisible, setConfirmVisible] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${server}/user/update-user-password`, { currentPassword, newPassword, confirmNewPassword }, {
                withCredentials: true,
            });
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="w-full px-5">

            <h1 className="text-[25px] text-center font-[600] text-[#000000ba] pb-2 ">
                Change Password
            </h1>
            <br />
            <form area-required onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                <div className=" w-[100%] 800px:w-[50%] relative">
                    <label className="block pb-2  ">Enter you current password</label>
                    <input
                        type={currentVisible ? "text" : "password"}
                        className={`${styles.input} !w-[95%] relative`}
                        require
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {
                        currentPassword && (currentVisible ? (<AiOutlineEye className="absolute right-10 top-9 cursor-pointer" size={25} onClick={() => setCurrentVisible(false)} />) :
                            (<AiOutlineEyeInvisible className="absolute right-10 top-9 cursor-pointer" size={25} onClick={() => setCurrentVisible(true)} />))
                    }
                </div>
                <div className=" w-[100%] 800px:w-[50%] mt-2 relative">
                    <label className="block pb-2 ">Enter you new password</label>
                    <input
                        type={newVisible ? "text" : "password"}
                        className={`${styles.input} !w-[95%]`}
                        require
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {
                        newPassword && (newVisible ? (<AiOutlineEye className="absolute right-10 top-9 cursor-pointer" size={25} onClick={() => setNewVisible(false)} />) :
                            (<AiOutlineEyeInvisible className="absolute right-10 top-9 cursor-pointer" size={25} onClick={() => setNewVisible(true)} />))
                    }
                </div>
                <div className=" w-[100%] 800px:w-[50%] mt-2 relative">
                    <label className="block pb-2 ">Confirm you new password</label>
                    <input
                        type={confirmVisible ? "text" : "password"}
                        className={`${styles.input} !w-[95%]`}
                        require
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    {
                        confirmNewPassword && (confirmVisible ? (<AiOutlineEye className="absolute right-10 top-9 cursor-pointer" size={25} onClick={() => setConfirmVisible(false)} />) :
                            (<AiOutlineEyeInvisible className="absolute right-10 top-9 cursor-pointer" size={25} onClick={() => setConfirmVisible(true)} />))
                    }
                </div>
                <input
                    type="submit"
                    className="w-[50%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer"
                    required
                    value="Update"
                />
            </form>

        </div>
    );
};

const Address = () => {
    const { user, isError } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState();
    const [addressType, setAddressType] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const dispatch = useDispatch();
    const addressTypeData = [
        {
            name: "Default",
        },
        {
            name: "Home",
        },
        {
            name: "Office",
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (addressType === "" || country === "" || city === "") {
            toast.error("Please fill all the fields!!");
        } else {
            dispatch(
                updateUserAddress({
                    country,
                    state,
                    city,
                    address1,
                    address2,
                    zipCode,
                    addressType,
                })
            );
            setOpen(false)
            setCountry("")
            setState("")
            setCity("")
            setAddress1("")
            setAddress2("")
            setZipCode(null)
            setAddressType("")
            if (!isError) {
                toast.success("Address addded successflly");
            }
        }
    };

    const handleDelete = (address) => {
        dispatch(deleteUserAddress(address._id))
        if (!isError) {
            toast.success("Address deleted successflly");
        }

    }
    return (
        <div className="w-full px-5">
            {open && (
                <div className="    fixed w-full h-screen bg-[#00000041] top-0 left-0 flex items-center justify-center">
                    <div className="w-[45%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
                        <div className="w-full flex justify-end p-3">
                            <RxCross1
                                size={30}
                                className="cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                        </div>
                        <h1 className="text-center text-[25px] font-Poppins">
                            Add New Address
                        </h1>
                        <div className="w-full">
                            <form aria-required onSubmit={handleSubmit} className="w-full">
                                <div className="w-full block p-4">
                                    <div className="w-full pb-2">
                                        <label className="block pb-2">Country</label>
                                        <select
                                            name=""
                                            id=""
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            className="w-[95%] border h-[40px] rounded-[5px]"
                                        >
                                            <option value="" className="block pb-2">
                                                Choose your country
                                            </option>
                                            {Country &&
                                                Country.getAllCountries().map((country) => (
                                                    <option
                                                        className="block pb-2"
                                                        key={country.isoCode}
                                                        value={country.isoCode}
                                                    >
                                                        {country.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="w-full pb-2">
                                        <label className="block pb-2">State</label>
                                        <select
                                            name=""
                                            id=""
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            className="w-[95%] border h-[40px] rounded-[5px]"
                                        >
                                            <option value="" className="block pb-2">
                                                Choose your State
                                            </option>
                                            {State &&
                                                State.getStatesOfCountry(country).map((state) => (
                                                    <option
                                                        className="block pb-2"
                                                        key={state.isoCode}
                                                        value={state.isoCode}
                                                    >
                                                        {state.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="w-full pb-2">
                                        <label className="block pb-2">City</label>
                                        <select
                                            name=""
                                            id=""
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="w-[95%] border h-[40px] rounded-[5px]"
                                        >
                                            <option value="" className="block pb-2">
                                                Choose your City
                                            </option>
                                            {City &&
                                                City.getCitiesOfState(country, state).map((city) => (
                                                    <option
                                                        className="block pb-2"
                                                        key={city.isoCode}
                                                        value={city.name}
                                                    >
                                                        {city.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="w-full pb-2">
                                        <label className="block pb-2">Address 1</label>
                                        <input
                                            type="address"
                                            className={`${styles.input}`}
                                            required
                                            value={address1}
                                            onChange={(e) => setAddress1(e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full pb-2">
                                        <label className="block pb-2">Address 2</label>
                                        <input
                                            type="address"
                                            className={`${styles.input}`}
                                            required
                                            value={address2}
                                            onChange={(e) => setAddress2(e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full pb-2">
                                        <label className="block pb-2">ZipCode</label>
                                        <input
                                            type="address"
                                            className={`${styles.input}`}
                                            required
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                        />
                                    </div>

                                    <div className="w-full pb-2">
                                        <label className="block pb-2">Address Type</label>
                                        <select
                                            name=""
                                            id=""
                                            value={addressType}
                                            onChange={(e) => setAddressType(e.target.value)}
                                            className="w-[95%] border h-[40px] rounded-[5px]"
                                        >
                                            <option value="" className="block pb-2">
                                                Choose your Address Type
                                            </option>
                                            {addressTypeData &&
                                                addressTypeData.map((type) => (
                                                    <option
                                                        className="block pb-2"
                                                        key={city.name}
                                                        value={city.name}
                                                    >
                                                        {type.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="w-full pb-2">
                                        <input
                                            type="submit"
                                            className={`${styles.input} mt-5 cursor-pointer`}
                                            required
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex w-full items-center justify-between">
                <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2 ">
                    My Address
                </h1>
                <div
                    className={` ${styles.button}!rounded-md`}
                    onClick={() => setOpen(true)}
                >
                    <span className="text-[#fff]">Add New</span>
                </div>
            </div>
            <br />

            <div className="flex flex-col ">
                {
                    user && user.addresses.map((address) => (
                        <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mt-4">
                            <div className="flex items-center">
                                <h5 className="pl-5 font-[600]">{address.addressType}</h5>
                            </div>
                            <div className="pl-8 flex items-center">
                                <h5 className="pl-6">
                                    {address.address2},{address.address1},{address.city},
                                    {address.state} , {address.country}
                                </h5>
                            </div>
                            <div className="pl-8 flex items-center">
                                <h5 className="pl-6"> {user.phoneNumber}</h5>
                            </div>
                            <div className="min-w-[10%] flex items-center justify-between pl-8 " onClick={() => handleDelete(address)}>
                                <AiOutlineDelete size={25} className="cursor-pointer" />
                            </div>


                        </div>
                    ))
                }
                {
                    user && user.addresses.length === 0 && (
                        <h5 className="text-center pt-8 text-[18px]">You don't have any saved address</h5>
                    )
                }
            </div>



        </div>
    );
};

export default ProfileContent;
