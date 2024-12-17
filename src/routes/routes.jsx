import {createBrowserRouter} from 'react-router-dom'
import RegistePage from '../pages/RegisterPage'
import CheckEmailPage from '../pages/CheckEmailPage'
import CheckPasswordPage from '../pages/CheckPasswordPage'
import Home from '../pages/Home'
import MessagePage from '../components/MessagePage'
import App from '../App'
import AuthLayout from '../layout'

const router = createBrowserRouter([
    {
        path: "/", element: <App/>,
        children: [
            {
                path: "register",
                element: <AuthLayout><RegistePage/></AuthLayout>
            },
            {
                path: "email",
                element: <AuthLayout><CheckEmailPage/></AuthLayout>
            },
            {
                path: "password",
                element: <AuthLayout><CheckPasswordPage/></AuthLayout>
            },
            {
                path: "",
                element: <Home/>,
                children: [
                    {
                        path: "/:userId",
                        element: <MessagePage/> 
                    }
                ]
            }
        ]

    }
])

export default router