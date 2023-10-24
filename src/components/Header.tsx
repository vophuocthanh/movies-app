import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/logo.jpg'
import { Button } from './ui/Button'

function Header() {
  return (
    <div className="main-content">
      <header className="flex items-center justify-around pb-3 h-[110px] mb-5 text-white header gap-x-5 z-[999] bg-[#191A2E]">
        <Link to="/">
          <img
            className="w-[120px] bg-transparent h-[40px]"
            src={Logo}
            alt="Movies"
          />
        </Link>
        <div className="flex gap-5">
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
        </div>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </header>
    </div>
  )
}

export default Header
