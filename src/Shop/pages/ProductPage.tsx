import { Link, useOutletContext, useParams } from "react-router-dom"

export default function ProductPage() {
    const { productId } = useParams()
    const showProduct = useOutletContext()

    console.log(productId)
    console.log(showProduct)

    return (
        <>
            item {productId}
            <Link
                to={"/shop"}
                onClick={() => {
                    showProduct.setShowProduct(false)
                }}
            >
                S H O P
            </Link>
        </>
    )
}
