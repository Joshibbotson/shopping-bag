import { Link, useOutletContext, useParams } from "react-router-dom"

interface Product {
    showProduct: boolean
    setShowProduct: (arg0: boolean) => void
}
export default function ProductPage() {
    const { productId } = useParams()
    const showProduct: Product = useOutletContext()

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
