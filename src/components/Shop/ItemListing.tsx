import shopSCSS from "./Shop.module.scss"
import { Link, useParams } from "react-router-dom"
import ItemPage from "./clickThroughPage/ItemPage"

interface Props {
    title: string
    imageUrl: string
    price: number
    id: number
    // addItemToBag: (
    //     title: string,
    //     imageUrl: string,
    //     price: number,
    //     id: number
    // ) => void
}

export default function itemListing({ title, imageUrl, price, id }: Props) {
    const backgroundImageStyle = {
        backgroundImage: `url(${imageUrl})`,
    }

    const { itemId } = useParams()

    return (
        <div className={shopSCSS.itemListing}>
            <div className={shopSCSS.img} style={backgroundImageStyle}></div>
            <hr />

            <div className={shopSCSS.bottomContainer}>
                <h1>{title}</h1>
                <h5>£{price}</h5>
                <Link to={`/shop/${itemId}`} relative="path">
                    add
                </Link>
            </div>
        </div>
    )
}
