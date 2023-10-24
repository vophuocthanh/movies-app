import { Routes } from '@generouted/react-router'
import { createRoot } from 'react-dom/client'
import { Toaster } from './components/ui/Toaster'
import './style.scss'
import 'swiper/scss'

function App() {
  return (
    <>
      <Routes />
      <Toaster />
    </>
  )
}

const root = createRoot(document.getElementById('root'))

root.render(<App />)
