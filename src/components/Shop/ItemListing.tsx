import shopSCSS from "./Shop.module.scss"

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

    return (
        <div className={shopSCSS.itemListing}>
            <div className={shopSCSS.img} style={backgroundImageStyle}></div>
            <hr />

            <div className={shopSCSS.bottomContainer}>
                <h1>{title}</h1>
                <h5>£{price}</h5>
                <button
                // onClick={() => {
                //     return addItemToBag(title, imageUrl, price, id)
                // }}
                >
                    Add to bag
                </button>
            </div>
        </div>
    )
}
