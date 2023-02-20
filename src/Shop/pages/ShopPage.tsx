import { useShopProductData } from "../../RootLayout"
// import { useAddItemToBag } from "../RootLayout"
import Loading from "../../Loading/Loading"
import ItemListing from "../components/ItemListing"
import shopSCSS from "../styles/Shop.module.scss"

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

export default function Shop() {
    const data: any | null = useShopProductData()
    // const addItemToBag = useAddItemToBag()
    return (
        <>
            {data ? (
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
                                    // addItemToBag={addItemToBag}
                                />
                            )
                        })}
                    </div>
                </section>
            ) : (
                <Loading />
            )}
        </>
    )
}
