import checkoutItemSCSS from "./CheckoutItem.module.scss"

interface Props {
    title: string
    price: number
    amount: number
    id: number
    decrementAmount: (value: number) => void
    incrementAmount: (value: number) => void
}

export default function CheckoutItem({
    title,
    price,
    amount,
    id,
    decrementAmount,
    incrementAmount,
}: Props) {
    return (
        <div className={checkoutItemSCSS.checkoutItemContainer}>
            <h1> {title} </h1>
            <p>{price}</p>
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
