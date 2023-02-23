import shopSCSS from "../styles/Shop.module.scss"
import { Link, Outlet, useParams } from "react-router-dom"

interface Props {
    title: string
    imageUrl: string
    price: number
    id: number
    showProduct: boolean
    setShowProduct: (arg0: boolean) => void

    // addItemToBag: (
    //     title: string,
    //     imageUrl: string,
    //     price: number,
    //     id: number
    // ) => void
}

export default function itemListing({
    title,
    imageUrl,
    price,
    id,
    showProduct,
    setShowProduct,
}: Props) {
    const backgroundImageStyle = {
        backgroundImage: `url(${imageUrl})`,
    }

    return (
        <div className={shopSCSS.itemListing}>
            <Link
                to={`${id}`}
                onClick={() => {
                    setShowProduct(!showProduct)
                }}
            >
                <div
                    className={shopSCSS.img}
                    style={backgroundImageStyle}
                ></div>
            </Link>
            <hr />

            <div className={shopSCSS.bottomContainer}>
                <h1>{title}</h1>
                <h5>£{price}</h5>
            </div>
        </div>
    )
}
