import checkoutItemSCSS from "../styles/CheckoutItem.module.scss"
import intToCurrency from "../../UtilFunctions/IntToCurrency"

interface Props {
    title: string
    price: number
    amount: number
    sumPrice: number
    id: number
    imageUrl: string
    decrementAmount: (value: number) => void
    incrementAmount: (value: number) => void
}

export default function CheckoutItem({
    title,
    price,
    amount,
    sumPrice,
    id,
    imageUrl,
    decrementAmount,
    incrementAmount,
}: Props) {
    const backgroundImageStyle = {
        backgroundImage: `url(${imageUrl})`,
    }
    return (
        <div className={checkoutItemSCSS.checkoutItemContainer}>
            <h1> {title} </h1>
            <p>{intToCurrency(sumPrice)}</p>
            <div className={checkoutItemSCSS.amountContainer}>
                <button
                    onClick={() => {
                        decrementAmount(id)
                    }}
                >
                    -
                </button>
                <h4>{amount}</h4>
                <button
                    onClick={() => {
                        incrementAmount(id)
                    }}
                >
                    +
                </button>
            </div>
        </div>
    )
}
