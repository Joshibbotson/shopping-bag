import { NavLink, Outlet, useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import RootLayoutSCSS from "./RootLayout.module.scss"
import CheckoutItem from "./Shop/components/CheckoutItem"
// import uniqid from "uniqid"

type ShopProductDataType = Record<string, any> | null

export type AddItemToBagType = (
    title: string,
    imageUrl: string,
    price: number,
    id: number
) => void

export default function RootLayout() {
    const [shopProductData, setShopProductData] =
        useState<ShopProductDataType>(null)
    const [counter, setCounter] = useState<number>(1)
    const [bagContents, setBagContents] = useState<Array<any>>([
        {
            title: "test title",
            imageUrl: "",
            price: 23.3,
            amount: 1,
            sumPrice: 23.3,
            id: 6,
        },
        {
            title: "new title",
            imageUrl: "",
            price: 45.3,
            amount: 2,
            sumPrice: 45.3,
            id: 7,
        },
    ])

    //Determine if checkout bag should be shown or not//
    const [checkout, setCheckout] = useState<boolean>(false)

    useEffect(() => {
        ;(async function getShopProductData() {
            try {
                const result = await fetch(
                    "https://fakestoreapi.com/products?limit=10",
                    { mode: "cors" }
                )
                const json = await result.json()

                setShopProductData(json)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    const incrementAmount = (id: number) => {
        setBagContents(
            bagContents.map(item => {
                if (item.id === id) {
                    item.amount += 1
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
        console.log(shopProductData)
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
        //check bag contents for id, if it exists increment amount + price//
        setBagContents(
            bagContents.map(item => {
                if (item.id === id) {
                    item.amount += 1
                    item.sumPrice += item.price
                }
                return item
            })
        )
        //else if doesn't exist create it//
        setBagContents([
            ...bagContents,
            {
                title: title,
                imageUrl: imageUrl,
                price: price,
                sumPrice: price,
                amount: 1,
            },
        ])
    }

    return (
        <>
            <header>
                <nav>
                    <h1>UBIQUITIOUS STORE</h1>
                    <NavLink to={"/home"}>Home</NavLink>
                    <NavLink to={"/shop"}>Shop</NavLink>

                    {counter ? (
                        <div className={RootLayoutSCSS.shoppingBagContainer}>
                            <div className={RootLayoutSCSS.ItemCountContainer}>
                                <div className={RootLayoutSCSS.square}>
                                    <div className={RootLayoutSCSS.itemCount}>
                                        {counter > 99 ? "99+" : counter}
                                    </div>
                                </div>
                                <div className={RootLayoutSCSS.triangle}></div>
                            </div>
                            <button
                                onClick={() => {
                                    setCheckout(!checkout)
                                }}
                            ></button>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                setCheckout(!checkout)
                            }}
                        ></button>
                    )}
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

                        <button
                            onClick={() => {
                                setCheckout(!checkout)
                            }}
                        >
                            Close
                        </button>
                    </div>
                    <Outlet context={shopProductData} />
                </main>
            ) : (
                <main>
                    <div
                        className={`${RootLayoutSCSS.backDrop} ${RootLayoutSCSS.hide}`}
                    ></div>
                    <div
                        className={`${RootLayoutSCSS.showBag} ${RootLayoutSCSS.hideBag}`}
                    ></div>
                    <Outlet context={shopProductData} />
                </main>
            )}
        </>
    )
}

export function useShopProductData() {
    return useOutletContext<ShopProductDataType>()
}

// export function useAddItemToBag() {
//     return useOutletContext<AddItemToBagType>()
// }
