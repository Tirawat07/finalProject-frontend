import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import HomePage from '../components/HomePage'
import Login from '../components/Login'
import RegisterPage from '../components/RegisterPage'

import ProtectRoute from './ProtectRoute'

import EventManage from '../components/admin/Event/EventManage'
import WateringManage from '../components/admin/Water/WateringManage'
import AdminPage from '../components/admin/AdminPage'
import TaskManage from '../components/admin/Task/TaskManage'
import DataShard from '../components/admin/Task/DataShard'
import Order from '../components/Order'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'login', element: < Login /> },
            { path: 'register', element: < RegisterPage /> },
            {
                path: 'orderProduct',
                element: <ProtectRoute element={<Order />} allow={['USER']} />
            }

        ]

    },
    {
        path: "/admin",
        element: <ProtectRoute element={<AdminPage />} allow={["ADMIN"]} />,
        // element: <AdminPage />,
        children: [

            { index: true, element: <WateringManage /> },
            { path: "event", element: <EventManage /> },
            { path: "task", element: < TaskManage /> },

        ]
    },

])


const AppRoute = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default AppRoute