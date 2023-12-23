import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../../Static/data'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { createProduct } from '../../redux/slice/product'
import { toast } from 'react-toastify'
import { createEvent } from '../../redux/slice/event'

const CreateEvent = () => {
    const { shop } = useSelector((state) => state.shop)
    const { eventError, eventSuccess } = useSelector((state) => state.event)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [images, setImages] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [category, setCategory] = useState("")
    const [originalPrice, setOriginalPrice] = useState(0)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const newForm = new FormData()

        newForm.append("name", name)
        newForm.append("description", description)
        newForm.append("category", category)
        newForm.append("tags", tags)
        newForm.append("originalPrice", originalPrice)
        newForm.append("discountPrice", discountPrice)
        newForm.append("stock", stock)
        newForm.append("shopId", shop._id)
        newForm.append("startDate", startDate)
        newForm.append("endDate", endDate)
        images.forEach((image) => {
            newForm.append("images", image)
        })
        dispatch(createEvent(newForm))
    }
    const handleImageChange = (e) => {
        e.preventDefault()
        const files = Array.from(e.target.files)
        setImages((prevImages => [...prevImages, ...files]))


    }
    const handleStartDateChange = (e) => { 
        const startDate= new Date(e.target.value)
        const minEndDate= new Date(startDate.getTime() + 3*24 * 60 * 60 *1000 )
        setStartDate(startDate)
        setEndDate(null)
        document.getElementById("end-date").min=minEndDate.toISOString().slice(0, 10)
    }
    const handleEndDateChange = (e) => { 
        const endDate= new Date(e.target.value)
        setEndDate(endDate)
        
    }
     
    const today= new Date().toISOString().slice(0, 10)
    const minEndDate= startDate ?new Date(startDate.getTime() + 3*24 * 60 * 60 *1000 ).toISOString().slice(0, 10): today
    useEffect(() => {
        if (eventError) {
            toast.error(eventError)
        }
        if (eventSuccess) {

            toast.success("Event is created successfully")
            navigate("/dashboard-events") 
            window.location.reload(true)

        }
    }, [eventSuccess,eventError])


    return (
        <div className='w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
            <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
            {/* Create product form */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <label className='pb-2'
                    >Name <span className="text-red-500">
                            *</span></label>
                    <input type="text" name='name' id='name' value={name} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setName(e.target.value)} placeholder='Enter your event name..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Description  <span className="text-red-500">
                            *</span></label>
                    <textarea type="text" cols="30" required rows="8" name='description' id='description' value={description} className='mt-2 appearance-none block w-full px-3 pt-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setDescription(e.target.value)} placeholder='Enter your  event description..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Category<span className="text-red-500">
                            *</span></label>
                    <select className='w-full mt-2 border h-[35px] rounded-[5px] ' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="choose a  category">Choose a category</option>
                        {
                            categoriesData && categoriesData.map((category) => (
                                <option value={category.title} key={category.id}>{category.title}</option>
                            ))
                        }
                    </select>
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Tags  </label>
                    <input type="text" name='tags' id='tags' value={tags} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setTags(e.target.value)} placeholder='Enter your  event product tags..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Original Price  </label>
                    <input type="number" name='price' id='price' value={originalPrice} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setOriginalPrice(e.target.value)} placeholder='Enter your  event product price..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Price (after Discount) <span className="text-red-500">
                            *</span> </label>
                    <input type="number" name='price' id='price' value={discountPrice} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setDiscountPrice(e.target.value)} placeholder='Enter your event product price after discount..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Product Stock <span className="text-red-500">
                            *</span> </label>
                    <input type="number" name='stock' id='stock' value={stock} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setStock(e.target.value)} placeholder='Enter your event product stock..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Start Date <span className="text-red-500">
                            *</span> </label>
                    <input type="date" name='start-date' id='start-date' value={startDate ? startDate.toISOString().slice(0, 10) : ""} min={today} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={handleStartDateChange} placeholder='Enter your event start date..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >End Date <span className="text-red-500">
                            *</span> </label>
                    <input type="date" name='end-date' id='end-date' value={endDate ? endDate.toISOString().slice(0, 10) : ""} min={minEndDate} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={handleEndDateChange} placeholder='Enter your event end date..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Upload Images<span className="text-red-500">
                            *</span> </label>
                    <div className='flex items-center flex-wrap '>
                        <input type="file" name="upload" id="upload" className='hidden' multiple onChange={handleImageChange} />
                        <label htmlFor="upload"><AiOutlinePlusCircle size={30} className='mt-3' color='#555' /></label>
                        {images && images.map((image, i) => (
                            <img src={URL.createObjectURL(image)} key={i} className='h-[120px]  w[120px] object-cover m-2' />
                        ))}
                    </div>
                    <br />
                    <div>
                        <input type="submit" value="Create" className='mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateEvent