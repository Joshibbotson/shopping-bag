import Home from "./Home/HomePage"
import Shop from "./Shop/pages/ShopPage"
import AboutUs from "./AboutUs/AboutUs"
import RootLayout from "./RootLayout"
import NotFound from "./NotFound/NotFound"

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
                <Route index path="/" element={<Home />} />
                <Route path="shop" element={<Shop />}>
                    <Route path=":productId" element={<ProductPage />} />
                </Route>
                <Route path="aboutUs" element={<AboutUs />} />
            </Route>
            <Route path="*" errorElement element={<NotFound />} />
        </Route>
    )
)

export default { router }
