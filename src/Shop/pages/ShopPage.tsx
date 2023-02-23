import Loading from "../../Loading/Loading"
import ItemListing from "../components/ItemListing"
import shopSCSS from "../styles/Shop.module.scss"
import ProductModalSCSS from "../styles/ProductModal.module.scss"
import { Outlet, useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"

interface Product {
    title: string
    image: string
    price: number
    sumPrice: number
    id: number
}

interface OutletContextType {
    shopProductData: Record<string, any> | null
    addItemToBag: (
        title: string,
        imageUrl: string,
        price: number,
        id: number
    ) => void
}

export default function Shop() {
    const [showProduct, setShowProduct] = useState<boolean>(false)

    const data: OutletContextType = useOutletContext()
    const { shopProductData } = data
    const { addItemToBag } = data

    // adjust showProduct based on siteUrl//
    useEffect(() => {
        let currentUrl: string = window.location.href

        const getSiteName = (url: string) => {
            const splitUrl = url.split("")
            const urlName = []

            for (let i = 7; i < splitUrl.length; i++) {
                if (splitUrl[i] === "/") {
                    return urlName.join("")
                }
                urlName.push(splitUrl[i])
            }
        }
        const siteUrl = getSiteName(currentUrl)

        currentUrl === `http://${siteUrl}/shop` ? setShowProduct(false) : ""

        const checkForProductPage = (url: string | undefined) => {
            for (let i = 0; i < shopProductData!.length; i++) {
                if (currentUrl === `http://${url}/shop/${i}`) {
                    setShowProduct(true)
                }
            }
        }

        shopProductData ? checkForProductPage(siteUrl) : ""
    }, [window.location.href, shopProductData])

    return (
        <>
            {shopProductData ? (
                <>
                    <section>
                        <div className={shopSCSS.gridLayout}>
                            {shopProductData.map((item: Product) => {
                                return (
                                    <ItemListing
                                        title={item.title}
                                        imageUrl={item.image}
                                        price={item.price}
                                        key={item.id}
                                        id={item.id}
                                        showProduct={showProduct}
                                        setShowProduct={setShowProduct}
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
                                            addItemToBag,
                                            shopProductData,
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
