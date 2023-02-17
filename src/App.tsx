import "./App.module.scss"

import { router } from "./Routes"
import { RouterProvider } from "react-router-dom"

export default function App() {
    return <RouterProvider router={router} />
}
