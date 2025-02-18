import React from 'react'
import './hero.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { assets } from '../assets/assets'
const Hero = () => {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            showThumbs={true}
            showStatus={true}
            transitionTime={600}
            className='custom-carousel'
        >
            <div>
                <img src={assets.slider1} alt="Slide 1" />
            </div>
            <div>
                <img src={assets.slider2} alt="Slide 2" />
            </div>
            <div>
                <img src={assets.slider3} alt="Slide 3" />
            </div>
           
        </Carousel>
    )
}

export default Hero