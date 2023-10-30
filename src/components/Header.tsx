import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/logo.jpg'
import { Button } from './ui/Button'

function Header() {
  return (
    <div className="main-content">
      <header className="flex items-center justify-around pb-3 h-[110px] mb-5 text-white header gap-x-5 z-[999] bg-gradient-to-br from-pink-300 via-purple-400 to-blue-300">
        <Link to="/">
          <img
            className="w-[120px] rounded-xl h-[40px]"
            src={Logo}
            alt="Movies"
          />
        </Link>
        <div className="flex items-center gap-10 text-xl font-bold">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-primary_color' : '')}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? 'text-primary_color' : '')}
          >
            Movies
          </NavLink>
          <Link to="/login">
            <Button className="rounded-2xl px-7">Login</Button>
          </Link>
        </div>
      </header>
    </div>
  )
}

export default Header
