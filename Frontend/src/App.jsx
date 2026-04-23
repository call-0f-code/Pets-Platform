import LandingPage from '../src/pages/LandingPage'
import Dashboard from '../src/pages//Dashboard'
import VetFinder from '../src/pages/VetFinder'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreatePostPage from '../src/pages/CreatePostPage'
import CommunityFeed from '../src/pages/CommunityFeed'
import Signup from '../src/pages/Signup'
import Login from '../src/pages/Login'
import UserProfile from './pages/UserProfile'
import PetProfile from './pages/petProfile'
import NotFound from './pages/NotFound'


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
    },
    {
      path: "/create-post",
      element: <CreatePostPage />
    },
    {
      path: "/community-feed",
      element: <CommunityFeed />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "profile",
      element: <UserProfile />
    },
    {
      path : "/pet/:id",
      element : <PetProfile />
    }, 
    {
      path : "*",
      element : <NotFound />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
