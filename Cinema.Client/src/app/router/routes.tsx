import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import HomePage from '../../pages/home/ui/HomePage'
import NotFoundPage from '../../pages/not-found/ui/NotFoundPage'
import Login from '../../features/auth/Login'
import SignUp from '../../features/auth/SignUp'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'auth/login', element: <Login /> },
            { path: 'auth/signup', element: <SignUp /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
])
