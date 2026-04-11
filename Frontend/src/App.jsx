import './App.css'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import VetFinder from './pages/VetFinder'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/vet-finder",
      element: <VetFinder />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
