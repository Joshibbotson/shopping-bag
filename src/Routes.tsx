import Home from "./components/Home/Home"
import Shop from "./components/Shop/Shop"
import RootLayout from "./components/RootLayout"

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom"
import ItemPage from "./components/Shop/clickThroughPage/ItemPage"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<RootLayout />}>
                <Route index path="home" element={<Home />} />
                <Route path="shop" element={<Shop />}>
                    <Route path=".." element={<ItemPage />} />
                </Route>
            </Route>
        </Route>
    )
)

export default { router }
