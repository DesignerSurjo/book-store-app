import React from 'react'
import { assets } from '../assets/assets'
const Banner = () => {
    return (
        <div className=''>
            <div className='flex gap-5'>

                <div> <img className='' src={assets.delivery1} alt="" /></div>

                <div><img src={assets.delivery2} alt="" /></div>
            </div>
            <div className='flex gap-5'>
                <div> <img src={assets.delivery3} alt="" />
                </div>
                <div> <img src={assets.delivery4} alt="" /></div>
            </div>
        </div>
    )
}

export default Banner