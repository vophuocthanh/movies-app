import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/logo.jpg'
import { Button } from './ui/Button'
import Hambeger from '../assets/hambeger.png'
import Drawer from './ui/Drawer'
import { useState } from 'react'

function Header() {
  const [isToggler, setIsToggler] = useState(false)

  const handleToggler = () => {
    setIsToggler(isToggler => !isToggler)
  }
  return (
    <div className="main-content">
      <header className="flex items-center justify-around pb-3 h-[110px] mb-5 text-white header gap-x-5 z-[999] bg-gradient-to-br from-pink-300 via-purple-400 to-blue-300">
        <Link to="/">
          <img
            className="w-[120px] rounded-xl h-[40px] sm:w-56 sm:h-16"
            src={Logo}
            alt="Movies"
          />
        </Link>
        <div className="flex gap-16 mx-8 text-xl font-medium md:mx-0 md:flex">
          <ul className="hidden md:gap-6 md:flex md:items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` ${isActive ? 'text-primary_color' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? 'text-primary_color' : ''
              }
            >
              Movies
            </NavLink>
            <Link to="/login">
              <Button> Login </Button>
            </Link>
          </ul>
        </div>
        <img
          className="w-12 h-12 ml-6 mr-6 cursor-pointer md:hidden"
          onClick={handleToggler}
          src={Hambeger}
          alt="bugger"
        />
        <Drawer open={isToggler} onClose={handleToggler}>
          <div className="mx-5">
            <img src={Logo} alt="logo" className="w-[320px] h-20" />
          </div>
          <div className="flex flex-col gap-6 mx-5 text-3xl font-bold my-7">
            <NavLink
              to="/"
              className={({ isActive }) =>
                ` ${isActive ? 'text-primary_color' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive ? 'text-primary_color' : ''
              }
            >
              Movies
            </NavLink>
            <Link to="/login">
              <Button className="px-10"> Login </Button>
            </Link>
          </div>
        </Drawer>
      </header>
    </div>
  )
}

export default Header
