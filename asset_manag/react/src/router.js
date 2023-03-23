import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import ProtectedLayout from "./Components/ProtectedLayout";
import GuestLayout from "./Components/GuestLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/",
        element: <ProtectedLayout />,
        children: [
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },
]);

export default router;
