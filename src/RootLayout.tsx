import { NavLink, Outlet, useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import RootLayoutSCSS from "./RootLayout.module.scss"
import CheckoutItem from "./Shop/components/CheckoutItem"
import intToCurrency from "./UtilFunctions/IntToCurrency"
import BagIcon from "./Shop/components/BagIcon"

type ShopProductDataType = Record<string, any> | null

export default function RootLayout() {
    const [shopProductData, setShopProductData] =
        useState<ShopProductDataType>(null)
    const [bagContents, setBagContents] = useState<Array<any>>([])
    const [counter, setCounter] = useState<number>(0)
    const [totalCost, setTotalCost] = useState<number>(0)

    //Determine if checkout bag should be shown or not//
    const [checkout, setCheckout] = useState<boolean>(false)
    //Determine whether product page should be displayed
    const [showProduct, setShowProduct] = useState<boolean>(false)

    useEffect(() => {
        ;(async function getShopProductData() {
            try {
                const result = await fetch(
                    "https://fakestoreapi.com/products?limit=12",
                    { mode: "cors" }
                )
                const json = await result.json()

                setShopProductData(json)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    //Ensure amount of items and totalCost is updated//
    useEffect(() => {
        setCounter(
            bagContents.reduce((accumulator, currentItem) => {
                return (accumulator += currentItem.amount)
            }, 0)
        )

        setTotalCost(
            bagContents.reduce((accumulator, currentItem) => {
                return (accumulator += currentItem.sumPrice)
            }, 0)
        )
    }, [bagContents, counter])

    const incrementAmount = (id: number) => {
        setBagContents(
            bagContents.map(item => {
                if (item.id === id) {
                    item.amount += 1
                    item.sumPrice += item.price
                }
                return item
            })
        )
    }

    const decrementAmount = (id: number) => {
        setBagContents(
            bagContents.map(item => {
                if (item.id === id) {
                    if (item.amount > 0) {
                        item.amount -= 1
                        item.sumPrice -= item.price
                    }
                }
                return item
            })
        )
        //delete checkout item if amount of 0//
        bagContents.map(item => {
            if (item.id === id) {
                if (item.amount === 0) {
                    deleteCheckoutItem(id)
                }
            }
        })
    }

    const deleteCheckoutItem = (id: number) => {
        setBagContents(
            bagContents.filter(item => {
                return item.id !== id
            })
        )
    }

    const addItemToBag = (
        title: string,
        imageUrl: string,
        price: string,
        id: number
    ) => {
        const isItemInBag = bagContents.some(item => item.id === id)

        //check bag contents for id, if it exists increment amount + price//
        if (isItemInBag) {
            setBagContents(
                bagContents.map(item => {
                    if (item.id === id) {
                        item.amount += 1
                        item.sumPrice += item.price
                        return item
                    } else {
                        return item
                    }
                })
            )
        } //if doesn't exist create it//
        else {
            setBagContents([
                ...bagContents,
                {
                    title: title,
                    imageUrl: imageUrl,
                    price: price,
                    sumPrice: price,
                    amount: 1,
                    id: id,
                },
            ])
        }
    }

    return (
        <>
            <header>
                <nav>
                    <h1>UBIQUITIOUS STORE</h1>
                    <NavLink
                        to={"/"}
                        onClick={() => {
                            setShowProduct(false)
                        }}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={"/shop"}
                        onClick={() => {
                            setShowProduct(false)
                        }}
                    >
                        Shop
                    </NavLink>
                    <BagIcon
                        counter={counter}
                        checkout={checkout}
                        setCheckout={setCheckout}
                    />
                </nav>
            </header>

            {/* Toggle checkout menu render */}
            {checkout ? (
                <main>
                    <div
                        className={RootLayoutSCSS.backDrop}
                        onClick={() => {
                            setCheckout(!checkout)
                        }}
                    ></div>
                    <div className={RootLayoutSCSS.showBag}>
                        <button
                            onClick={() => {
                                setCheckout(!checkout)
                            }}
                            className={RootLayoutSCSS.closeBtn}
                        >
                            X
                        </button>
                        <div className={RootLayoutSCSS.bagTitleWrapper}>
                            <h2 className={RootLayoutSCSS.bagTitle}>
                                MY SHOPPING BAG
                            </h2>
                        </div>
                        {bagContents.map(item => (
                            <CheckoutItem
                                title={item.title}
                                price={item.price}
                                amount={item.amount}
                                sumPrice={item.sumPrice}
                                imageUrl={item.imageUrl}
                                id={item.id}
                                decrementAmount={decrementAmount}
                                incrementAmount={incrementAmount}
                                key={item.id}
                            />
                        ))}
                        <h2>{intToCurrency(totalCost)}</h2>
                    </div>
                    <Outlet
                        context={{
                            shopProductData,
                            addItemToBag,
                            setCheckout,
                            showProduct,
                            setShowProduct,
                            counter,
                            checkout,
                        }}
                    />
                </main>
            ) : (
                <main>
                    <div
                        className={`${RootLayoutSCSS.backDrop} ${RootLayoutSCSS.hide}`}
                    ></div>
                    <div
                        className={`${RootLayoutSCSS.showBag} ${RootLayoutSCSS.hideBag}`}
                    ></div>
                    <Outlet
                        context={{
                            shopProductData,
                            addItemToBag,
                            setCheckout,
                            showProduct,
                            setShowProduct,
                            counter,
                            checkout,
                        }}
                    />
                </main>
            )}
        </>
    )
}
