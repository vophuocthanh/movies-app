import { Routes } from '@generouted/react-router'
import { createRoot } from 'react-dom/client'
import { Toaster } from './components/ui/Toaster'
import { QueryClient, QueryClientProvider } from 'react-query'
import './style.scss'
import 'swiper/scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes />
        <Toaster />
      </QueryClientProvider>
    </>
  )
}

const root = createRoot(document.getElementById('root'))

root.render(<App />)
