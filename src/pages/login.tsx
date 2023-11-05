import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { Link } from '@/router'
import Logo from '../assets/logo.jpg'
import bg from '@/assets/footer-bg.jpg'
import { useEffect } from 'react'

export default function Login() {
  useEffect(() => {
    document.title = 'Login'
  }, [])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Link to="/">
        <img
          className="w-50 h-20 absolute md:top-8 md:left-8 rounded-lg top-4 left-24"
          src={Logo}
          alt="Movies"
        />
      </Link>
      <form
        className="flex flex-col items-center sm:w-1/2 p-10 bg-white rounded-md  sm:h-1/4 md:h-88"
        onSubmit={onSubmit}
      >
        <div className="mb-4 text-center">
          <h2 className="mb-4 text-3xl font-semibold">Sign In</h2>
        </div>
        <Input placeholder="Email" className="mb-4" name="email" />
        <Input
          placeholder="Password"
          className="mb-4"
          type="password"
          name="password"
        />
        <div className="flex justify-between w-full mb-6">
          <label className="text-gray-400 ">
            <Checkbox />
            <span className="ml-2">Remember Me</span>
          </label>
        </div>
        <Button className="md:w-48 text-white" type="submit" variant="primary">
          Sign In
        </Button>
      </form>
    </div>
  )
}
