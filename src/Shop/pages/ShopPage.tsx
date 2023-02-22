import { useShopProductData } from "../../RootLayout"
// import { useAddItemToBag } from "../RootLayout"
import Loading from "../../Loading/Loading"
import ItemListing from "../components/ItemListing"
import shopSCSS from "../styles/Shop.module.scss"
import ProductModalSCSS from "../styles/ProductModal.module.scss"
import { Outlet, useOutletContext } from "react-router-dom"
import { useState } from "react"

interface Product {
    id: number
    title: string
    image: string
    price: number
    // addItemToBag: (
    //     title: string,
    //     imageUrl: string,
    //     price: number,
    //     id: number
    // ) => void
}

type ShowProductType = object

export default function Shop() {
    const [showProduct, setShowProduct] = useState<boolean>(false)

    const data: any | null = useShopProductData()

    return (
        <>
            {data ? (
                <>
                    <section>
                        <div className={shopSCSS.gridLayout}>
                            {data.map((item: Product) => {
                                return (
                                    <ItemListing
                                        title={item.title}
                                        imageUrl={item.image}
                                        price={item.price}
                                        key={item.id}
                                        id={item.id}
                                        showProduct={showProduct}
                                        setShowProduct={setShowProduct}
                                        // addItemToBag={addItemToBag}
                                    />
                                )
                            })}
                        </div>
                        {showProduct ? (
                            <>
                                <div
                                    className={ProductModalSCSS.backDrop}
                                ></div>
                                <div className={ProductModalSCSS.showBag}>
                                    <Outlet
                                        context={{
                                            showProduct,
                                            setShowProduct,
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    className={`${ProductModalSCSS.backDrop} ${ProductModalSCSS.hide}`}
                                ></div>
                                <div
                                    className={`${ProductModalSCSS.showBag} ${ProductModalSCSS.hideBag}`}
                                ></div>
                            </>
                        )}
                    </section>
                </>
            ) : (
                <Loading />
            )}
        </>
    )
}
