import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [category, setCategory] = useState("উপন্যাস");
  const [author, setAuthor] = useState("শরৎচন্দ্র চট্টোপাধ্যায়");
  const [bestseller, setBestseller] = useState(false);


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("oldPrice", oldPrice)
      formData.append("category", category)
      formData.append("author", author);
      formData.append("bestseller", bestseller)

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setOldPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }




  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start w-full gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className=' w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className=' w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>

      <div>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="উপন্যাস">উপন্যাস</option>
            <option value="গল্প">গল্প</option>
            <option value="কবিতা">কবিতা</option>
          </select>
        </div>

        <div>
          <p className='mb-2 mt-2'>Author</p>
          <select onChange={(e) => setAuthor(e.target.value)} className='w-full px-3 py-2'>
            <option value="শরৎচন্দ্র চট্টোপাধ্যায়">শরৎচন্দ্র চট্টোপাধ্যায়</option>
            <option value="হুমায়ূন আহমেদ">হুমায়ূন আহমেদ</option>
            <option value="মানিক বন্দ্যোপাধ্যায়">মানিক বন্দ্যোপাধ্যায়</option>
            <option value="আউয়াল চৌধুরী">আউয়াল চৌধুরী</option>
            <option value="রবীন্দ্রনাথ ঠাকুরr">রবীন্দ্রনাথ ঠাকুর</option>
            <option value="মোস্তাক আহমেদ">মোস্তাক আহমেদ</option>
            
          </select>
        </div>
      </div>

      <div>
        <p className='mb-2'>Price</p>
        <input onChange={(e) => setPrice(e.target.value)} value={price} type="Number" placeholder='$' required />
      </div>
      <div>
        <p className='mb-2'>Old Price</p>
        <input onChange={(e) => setOldPrice(e.target.value)} value={oldPrice} type="Number" placeholder='$' required />
      </div>

      {/* <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3 flex-col sm:flex-row'>
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"} px-3  py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"} px-3  py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"} px-3  py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"} px-3  py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"} px-3  py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>

      </div> */}

      <div className='gap-2 flex mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>
      <button type='submit' className='w-28 py-3 mt-4 bg-[#18032a] cursor-pointer text-white rounded-md'>Add</button>
    </form>
  )
}

export default Add