import Private from "../components/Private";
import LayoutDefault from "../layouts/layoutDefault";
import ChangePassword from "../pages/ChangePassword";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound404 from "../pages/pageError";
import SetNewPassword from "../pages/SetNewPassword";
import Signup from "../pages/Signup";

export const routes = [
    {
        path: '/',
        element: <LayoutDefault />,
        children: [
            {
                path: '/sign-up',
                element: <Signup />
            },
            {
                path: 'log-in',
                element: <Login />
            },
            {
                path: 'error',
                element: <NotFound404 />
            },
            {
                path: 'change-password',
                element: <ChangePassword />
            },
            {
                path: 'change-password/set-new-password',
                element: <SetNewPassword />
            },
            {
                path: '/',
                element: <Home />
            },
            {
                element: <Private />,
                children: [
                    {
                        path: '/dashboard',
                        element: <Dashboard />
                    }
                ]
            }
        ]
    }
]
