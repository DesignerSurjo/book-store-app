import React from 'react'
import { Link } from 'react-router-dom'

const Fotter = () => {
  return (
    <footer>
            <div className="footer sm:flex sm:justify-center sm:gap-80 bg-[#ffffff] text-neutral-950 p-10">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </div>
            <hr className=' border-black'/>
            <div className="footer footer-center bg-[#C31C37] w-full text-white  p-4">
                <aside>
                    <p className='text-sm'>Copyright © {new Date().getFullYear()} - All right reserved by <Link to='/'>  <span className='text-white hover:text-black'>STRAY FASH.</span></Link></p>
                </aside>
            </div>
        </footer>
  )
}

export default Fotter