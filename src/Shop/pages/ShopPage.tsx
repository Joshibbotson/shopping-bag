import Loading from "../../Loading/Loading"
import ItemListing from "../components/ItemListing"
import shopSCSS from "../styles/Shop.module.scss"
import ProductModalSCSS from "../styles/ProductModal.module.scss"
import { Link, Outlet, useOutletContext } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

interface Product {
    title: string
    image: string
    price: number
    sumPrice: number
    id: number
    category: string
    description: string
}

interface OutletContextType {
    shopProductData: Record<string, any> | null
    addItemToBag: (
        title: string,
        imageUrl: string,
        price: number,
        id: number
    ) => void
    setCheckout: (arg0: boolean) => void
    showProduct: boolean
    setShowProduct: (arg0: boolean) => void
    counter: number
    checkout: boolean
}

export default function Shop() {
    const data: OutletContextType = useOutletContext()
    const {
        shopProductData,
        addItemToBag,
        setCheckout,
        showProduct,
        setShowProduct,
        counter,
        checkout,
    } = data
    const [categorisedShopData, setCategorisedShopData] = useState<Record<
        string,
        any
    > | null>(null)
    const categoryRef = useRef<string>("all")

    //Ensure re-render of page when shop product data is fetched, so it's not stuck on Loading
    useEffect(() => {
        if (shopProductData) {
            setCategorisedShopData(shopProductData)
        }
    }, [shopProductData])

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

    //Ensures when an overlay is used that scrolling is prevented//
    useEffect(() => {
        const body = document.querySelector("body")

        if (showProduct || checkout) {
            body!.style.overflow = "hidden"
        } else {
            body!.style.overflow = "scroll"
        }
    }, [showProduct, checkout])

    return (
        <>
            {/* Ensure json data has been fetched before trying to load item listings */}
            {/* One thing to note is this is not necessarily a good method of category
            selection from a scalable point of view, as it requires fetching the 
            entire database for all categories on first load, thus would lead to a slower
            initial load time, but in this instance prevents excessive api calls */}
            {shopProductData && categorisedShopData ? (
                <>
                    <div className={shopSCSS.shopAndCategoryContainer}>
                        <div className={shopSCSS.categoryBtnsContainer}>
                            {/* <h1>{categoryRef.current}</h1> */}
                            <Link
                                to={"all"}
                                onClick={() => {
                                    setCategorisedShopData(
                                        shopProductData.map((item: Product) => {
                                            return item
                                        })
                                    )
                                    categoryRef.current = "all"
                                }}
                            >
                                All
                            </Link>
                            <Link
                                to={"mens"}
                                onClick={() => {
                                    setCategorisedShopData(
                                        shopProductData.filter(
                                            (item: Product) => {
                                                return (
                                                    item.category ===
                                                    "men's clothing"
                                                )
                                            }
                                        )
                                    )
                                    categoryRef.current = "mens"
                                }}
                            >
                                Men
                            </Link>
                            <Link
                                to={"womens"}
                                onClick={() => {
                                    setCategorisedShopData(
                                        shopProductData.filter(
                                            (item: Product) => {
                                                return (
                                                    item.category ===
                                                    "women's clothing"
                                                )
                                            }
                                        )
                                    )
                                    categoryRef.current = "womens"
                                }}
                            >
                                Women
                            </Link>
                            <Link
                                to={"jewellery"}
                                onClick={() => {
                                    setCategorisedShopData(
                                        shopProductData.filter(
                                            (item: Product) => {
                                                return (
                                                    item.category === "jewelery"
                                                )
                                            }
                                        )
                                    )
                                    categoryRef.current = "jewellery"
                                }}
                            >
                                Jewellery
                            </Link>
                            <Link
                                to={"electronics"}
                                onClick={() => {
                                    setCategorisedShopData(
                                        shopProductData.filter(
                                            (item: Product) => {
                                                return (
                                                    item.category ===
                                                    "electronics"
                                                )
                                            }
                                        )
                                    )
                                    categoryRef.current = "electronics"
                                }}
                            >
                                Electronics
                            </Link>
                        </div>
                        <section className={shopSCSS.shopSection}>
                            <div className={shopSCSS.gridLayout}>
                                {categorisedShopData.map((item: Product) => {
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
                                                setCheckout,
                                                counter,
                                                checkout,
                                                categoryRef,
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
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </>
    )
}
