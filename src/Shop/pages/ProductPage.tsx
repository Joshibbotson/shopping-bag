import { Link, useOutletContext, useParams } from "react-router-dom"
import productModalSCSS from "../styles/ProductModal.module.scss"
import intToCurrency from "../../UtilFunctions/IntToCurrency"
import BagIcon from "../components/BagIcon"

interface Product {
    showProduct: boolean
    setShowProduct: (arg0: boolean) => void
    addItemToBag: (
        title: string,
        imageUrl: string,
        price: number,
        id: number
    ) => void
    shopProductData: Array<ShopProduct>
    setCheckout: (arg0: boolean) => void
    counter: number
    checkout: boolean
    categoryRef: any
}

interface ShopProduct {
    id: number
    title: string
    price: number
    image: string
    description: string
    category: string
}

export default function ProductPage() {
    const { productId } = useParams()
    const data: Product = useOutletContext()
    const {
        showProduct,
        setShowProduct,
        addItemToBag,
        shopProductData,
        setCheckout,
        counter,
        checkout,
        categoryRef,
    } = data

    const targetData: ShopProduct[] = shopProductData!.filter(item => {
        return item.id === parseInt(productId!)
    })
    const backgroundImageStyle = {
        backgroundImage: `url(${targetData[0].image})`,
    }

    return (
        <>
            <section className={productModalSCSS.productContainer}>
                <div className={productModalSCSS.exitLinkWrapperMobile}>
                    <Link
                        to={`/shop/${categoryRef.current}`}
                        onClick={() => {
                            setShowProduct(false)
                            setCheckout(false)
                        }}
                    >
                        X
                    </Link>
                </div>

                <div className={productModalSCSS.innerProductContainer}>
                    <div
                        className={productModalSCSS.img}
                        style={backgroundImageStyle}
                    ></div>
                </div>
            </section>
            <section className={productModalSCSS.rightSection}>
                <div className={productModalSCSS.detailContainer}>
                    <h1>{targetData[0].title}</h1>
                    <h4>{intToCurrency(targetData[0].price)}</h4>
                    <hr />
                    <p>{targetData[0].description}</p>
                </div>

                <div className={productModalSCSS.btnContainer}>
                    <button
                        onClick={() => {
                            addItemToBag(
                                targetData[0].title,
                                targetData[0].image,
                                targetData[0].price,
                                targetData[0].id
                            )
                        }}
                    >
                        Add To Bag
                    </button>
                    <div className={productModalSCSS.exitLinkWrapperDesktop}>
                        <Link
                            to={`/shop/${categoryRef.current}`}
                            onClick={() => {
                                setShowProduct(false)
                                setCheckout(false)
                            }}
                        >
                            {"< Back to Shop"}
                        </Link>
                    </div>
                </div>

                <div className={productModalSCSS.checkoutBag}>
                    <BagIcon
                        counter={counter}
                        checkout={checkout}
                        setCheckout={setCheckout}
                    />
                </div>
            </section>
        </>
    )
}
