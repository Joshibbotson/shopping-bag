import checkoutItemSCSS from "../styles/CheckoutItem.module.scss"
import intToCurrency from "../../UtilFunctions/IntToCurrency"
import vatConversion from "../../UtilFunctions/vat"

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
            <div className={checkoutItemSCSS.checkoutImgWrapper}>
                <div
                    className={checkoutItemSCSS.checkoutImg}
                    style={backgroundImageStyle}
                ></div>
            </div>

            <div className={checkoutItemSCSS.rightCheckoutContainer}>
                <h4>{intToCurrency(sumPrice + vatConversion(sumPrice))}</h4>

                <h5>Gross amount: {intToCurrency(sumPrice)}</h5>
                <h6>VAT (20%): {intToCurrency(vatConversion(sumPrice))}</h6>

                <h3> {title} </h3>
                <div className={checkoutItemSCSS.amountContainer}>
                    <button
                        className={checkoutItemSCSS.minus}
                        onClick={() => {
                            decrementAmount(id)
                        }}
                    >
                        -
                    </button>
                    <h4>{amount}</h4>
                    <button
                        className={checkoutItemSCSS.plus}
                        onClick={() => {
                            incrementAmount(id)
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}
