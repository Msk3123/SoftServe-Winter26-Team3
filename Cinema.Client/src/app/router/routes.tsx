import { createBrowserRouter } from 'react-router'
import RootLayout from '../layouts/RootLayout'
import HomePage from '../../pages/home/ui/HomePage'
import NotFoundPage from '../../pages/not-found/ui/NotFoundPage'
import AuthPage from '../../pages/auth/AuthPage'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'auth', element: <AuthPage />}
        ],
    },
])
