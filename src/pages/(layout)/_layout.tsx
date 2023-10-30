import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Layout() {
  return (
    <div className="bg-gradient-to-br from-pink-300 via-purple-400 to-blue-300">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
