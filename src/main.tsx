import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

// import { toast } from '@/hooks/use-toast'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './context/theme-context'
import './index.css'
import "react-lazy-load-image-component/src/effects/blur.css";
import { router } from './routes/router'
import { Toaster } from 'react-hot-toast'
// Generated Routes


// Create a new router instance
const queryClient = new QueryClient();

// Register the router instance for type safety


// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <RouterProvider router={router} />
          <Toaster position="top-right" reverseOrder={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
