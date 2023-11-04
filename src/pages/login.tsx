import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { useToast } from '@/components/ui/use-toast'
import { Link, useNavigate } from '@/router'
import Logo from '../assets/logo.jpg'
import bg from '@/assets/footer-bg.jpg'
import { useEffect } from 'react'

export default function Login() {
  useEffect(() => {
    document.title = 'Login'
  }, [])
  const navigate = useNavigate()
  const { toast } = useToast()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    if (email === 'enouvo@gmail.com' && password === '123456') {
      localStorage.setItem('isAuth', 'true')
      navigate('/admin')
    } else {
      toast({
        title: 'Error',
        description: 'Email or password is incorrect',
        variant: 'destructive'
      })
    }
  }

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Link to="/">
        <img
          className="w-[200px] h-[80px] absolute top-8 left-8 rounded-lg"
          src={Logo}
          alt="Movies"
        />
      </Link>
      <form
        className="flex flex-col items-center w-1/4 p-10 bg-white rounded-md md:w-1/2 sm:h-1/4 md:h-1/3"
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
        <Button className="w-48 text-white" type="submit" variant="primary">
          Sign In
        </Button>
      </form>
    </div>
  )
}
