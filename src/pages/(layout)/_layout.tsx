import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'

export default function Layout() {
  return (
    <div className="bg-[#191A2E]">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}
