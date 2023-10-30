import React from 'react'
import { Link } from 'react-router-dom'
import logo from '@/assets/logo.jpg'
import bg from '@/assets/footer-bg.jpg'

const Footer = () => {
  return (
    <footer
      className="relative mt-2 px-8 py-24 bg-top bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-[1000px] mx-auto">
        <div className="flex items-center justify-center mb-12">
          <div className="logo">
            <img src={logo} className="w-[300px] rounded-xl h-[100px]" alt="" />
            <Link to="/">tMovies</Link>
          </div>
        </div>
        <div className="grid items-center grid-cols-3 gap-4 text-white">
          <div className="flex flex-col items-start justify-start mt-4 mb-4 text-xl font-semibold">
            <Link to="/">Home</Link>
            <Link to="/">Contact us</Link>
            <Link to="/">Term of services</Link>
            <Link to="/">About us</Link>
          </div>
          <div className="flex flex-col items-start justify-start mt-4 mb-4 text-xl font-semibold">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Pravacy policy</Link>
          </div>
          <div className="flex flex-col items-start justify-start mt-4 mb-4 text-xl font-semibold">
            <Link to="/">You must watch</Link>
            <Link to="/">Recent release</Link>
            <Link to="/">Top IMDB</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
