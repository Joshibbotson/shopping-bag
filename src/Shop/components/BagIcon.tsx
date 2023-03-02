// import BagIconSCSS from "../../RootLayout.module.scss"
import BagIconSCSS from "../styles/BagIcon.module.scss"
import bagPNG from "../../assets/bag.png"

interface Props {
    counter: number
    checkout: boolean
    setCheckout: (arg0: boolean) => void
}

export default function BagIcon({ counter, checkout, setCheckout }: Props) {
    // check if checkout bag item amount should be displayed //
    return counter ? (
        <div className={BagIconSCSS.shoppingBagContainer}>
            <div className={BagIconSCSS.ItemCountContainer}>
                <div className={BagIconSCSS.square}>
                    <div className={BagIconSCSS.itemCount}>
                        {counter > 99 ? "99+" : counter}
                    </div>
                </div>
                <div className={BagIconSCSS.triangle}></div>
            </div>
            <img
                src={bagPNG}
                onClick={() => {
                    setCheckout(!checkout)
                }}
                alt="checkout bag icon"
            ></img>
        </div>
    ) : (
        <div className={BagIconSCSS.shoppingBagContainer}>
            <img
                src={bagPNG}
                onClick={() => {
                    setCheckout(!checkout)
                }}
                alt="checkout bag icon"
            ></img>
        </div>
    )
}
