import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Home from './views/home/Home'
import Login from './views/login/Login'
import Register from './views/register/Register'
import './App.css'
import Quiz from './views/quiz/Quiz'


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
      element: <Quiz />
    }
  ])
    
     
    
  

  return (
    <div>
      <AuthProvider>
        <RouterProvider router={ router } />
      </AuthProvider>
    </div>
  )
}

export default App
