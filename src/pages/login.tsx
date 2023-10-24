import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { useToast } from '@/components/ui/use-toast'
import { Link, useNavigate } from '@/router'
import Logo from '../assets/logo.jpg'

export default function Login() {
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
    <div className="flex items-center justify-center h-screen">
      <Link to="/">
        <img
          className="w-[200px] h-[80px] absolute top-8 left-8"
          src={Logo}
          alt="Movies"
        />
      </Link>
      <form className="w-1/4 flex flex-col items-center" onSubmit={onSubmit}>
        <div className="text-center mb-4">
          <h2 className="text-3xl font-semibold mb-4">Sign In</h2>
        </div>
        <Input placeholder="Email" className="mb-4" name="email" />
        <Input
          placeholder="Password"
          className="mb-4"
          type="password"
          name="password"
        />
        <div className="flex justify-between w-full mb-6">
          <label className=" text-gray-400 ">
            <Checkbox />
            <span className="ml-2">Remember Me</span>
          </label>
        </div>
        <Button className="w-48" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  )
}
