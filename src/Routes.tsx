import Home from "./components/Home/Home"
import Shop from "./components/Shop/Shop"
import RootLayout from "./components/RootLayout"

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<RootLayout />}>
                <Route index path="home" element={<Home />} />
                <Route path="shop" element={<Shop />} />
            </Route>
        </Route>
    )
)

export default { router }
