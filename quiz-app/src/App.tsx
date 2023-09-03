import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './views/home/Home'
import Login from './views/login/Login'
import Register from './views/register/Register'
import './App.css'
import CreateQuiz from './views/createQuiz/CreateQuiz'


function App() {

  const router = createBrowserRouter ([
    {
      path: '/',
      element: <Home />
    },

    {
      path: '/login',
      element: <Login />
    },

    {
      path: '/register',
      element: <Register />
    },

    {
      path: '/quiz',
      element: <CreateQuiz />
    }
  ])
    
     
    
  

  return (
    <div>
      <RouterProvider router={ router } />
    </div>
  )
}

export default App
