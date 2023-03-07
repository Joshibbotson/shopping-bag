import Home from "./Home/HomePage"
import Shop from "./Shop/pages/ShopPage"
import RootLayout from "./RootLayout"
import NotFound from "./NotFound/NotFound"

import {
    createHashRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom"
import ProductPage from "./Shop/pages/ProductPage"

//Utilising Hash router for simplicity in this project but note it is not best practice.//
export const router = createHashRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<RootLayout />}>
                <Route index path="/" element={<Home />} />
                <Route path="shop" element={<Shop />}>
                    <Route path="all" element={<Shop />}></Route>
                    <Route path="mens" element={<Shop />}></Route>
                    <Route path="womens" element={<Shop />}></Route>
                    <Route path="jewellery" element={<Shop />}></Route>
                    <Route path="electronics" element={<Shop />}></Route>
                    <Route path=":productId" element={<ProductPage />} />
                </Route>
            </Route>
            <Route path="*" errorElement element={<NotFound />} />
        </Route>
    )
)

export default { router }
