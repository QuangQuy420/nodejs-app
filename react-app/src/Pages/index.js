import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Blogs from "./Blogs";
import ProtectedRoute from "../Components/Auth/ProtectedRoute";

/**
 * Define router.
 */
export const router = createBrowserRouter([
    {
        path: "/auth/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <ProtectedRoute>
            <Blogs />
        </ProtectedRoute>
    }
]);