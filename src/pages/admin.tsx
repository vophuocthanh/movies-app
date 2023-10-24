import { Input } from '@/components/ui/Input'
import { memo, useState } from 'react'

const Child = memo(() => {
  console.log('Child')
  return <div>Child</div>
})

function Admin() {
  const [value, setValue] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  console.log('Admin')
  return (
    <div className="w-40 p-3">
      <Input onChange={handleChange} value={value} />
      <Child />
    </div>
  )
}

export default Admin
