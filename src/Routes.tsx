import Home from "./Home/HomePage"
import Shop from "./Shop/pages/ShopPage"
import RootLayout from "./RootLayout"

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom"
import ProductPage from "./Shop/pages/ProductPage"

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<RootLayout />}>
                <Route index path="home" element={<Home />} />
                <Route path="shop" element={<Shop />}>
                    <Route path=":productId" element={<ProductPage />} />
                </Route>
            </Route>
        </Route>
    )
)

export default { router }