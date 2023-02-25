import shopSCSS from "../styles/Shop.module.scss"
import { Link } from "react-router-dom"
import intToCurrency from "../../UtilFunctions/IntToCurrency"

interface Props {
    title: string
    imageUrl: string
    price: number
    id: number
    showProduct: boolean
    setShowProduct: (arg0: boolean) => void
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
                <h5>{intToCurrency(price)}</h5>
            </div>
        </div>
    )
}
