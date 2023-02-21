import Home from "./Home/HomePage"
import Shop from "./Shop/pages/ShopPage"
import RootLayout from "./RootLayout"

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom"
import ItemPage from "./Shop/pages/ItemPage"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<RootLayout />}>
                <Route index path="home" element={<Home />} />
                <Route path="shop" element={<Shop />}>
                    <Route path=":productId" element={<ItemPage />} />
                </Route>
            </Route>
        </Route>
    )
)

export default { router }
