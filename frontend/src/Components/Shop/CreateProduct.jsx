import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { categoriesData } from '../../Static/data'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { createProduct } from '../../redux/slice/product'
import { toast } from 'react-toastify'

const CreateProduct = () => {
    const { shop } = useSelector((state) => state.shop)
    const { ProductError, ProductSuccess } = useSelector((state) => state.product)
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

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(createProduct({ name, description, category, tags, originalPrice, discountPrice, stock, shopId: shop._id, images }))
    }
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    }

    useEffect(() => {
        if (ProductError) {
            toast.error(ProductError)
        }
        if (ProductSuccess) {

            toast.success("Product is created successfully")
            navigate("/dashboard-products")
            window.location.reload(true)
        }
    }, [ProductError, ProductSuccess])


    return (
        <div className='w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
            <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
            {/* Create product form */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <label className='pb-2'
                    >Name <span className="text-red-500">
                            *</span></label>
                    <input type="text" name='name' id='name' value={name} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setName(e.target.value)} placeholder='Enter your product name..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Description  <span className="text-red-500">
                            *</span></label>
                    <textarea type="text" cols="30" required rows="8" name='description' id='description' value={description} className='mt-2 appearance-none block w-full px-3 pt-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setDescription(e.target.value)} placeholder='Enter your  product description..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Category<span className="text-red-500">
                            *</span></label>
                    <select className='w-full mt-2 border h-[35px] rounded-[5px] ' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="choose a category">Choose a category</option>
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
                    <input type="text" name='tags' id='tags' value={tags} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setTags(e.target.value)} placeholder='Enter your  product tags..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Original Price  </label>
                    <input type="number" name='price' id='price' value={originalPrice} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setOriginalPrice(e.target.value)} placeholder='Enter your  product price..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Price (after Discount) <span className="text-red-500">
                            *</span> </label>
                    <input type="number" name='price' id='price' value={discountPrice} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setDiscountPrice(e.target.value)} placeholder='Enter your  product price after discount..... ' />
                </div>
                <br />
                <div>
                    <label className='pb-2'
                    >Product Stock <span className="text-red-500">
                            *</span> </label>
                    <input type="number" name='stock' id='stock' value={stock} className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm' onChange={(e) => setStock(e.target.value)} placeholder='Enter your  product stock..... ' />
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
                            <img src={image} key={i} className='h-[120px]  w[120px] object-cover m-2' />
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

export default CreateProduct