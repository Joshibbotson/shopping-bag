import { useEffect } from "react"
import { useOutletContext, useParams } from "react-router-dom"

export default function ProductPage() {
    const { productId } = useParams()
    const showProductArr = useOutletContext()

    console.log(showProductArr.showProduct)

    useEffect(() => {
        showProductArr.setShowProduct(true)
    }, [])

    console.log(productId)
    return (
        <>
            item {productId}
            <button
                onClick={() => {
                    showProductArr.setShowProduct(!showProductArr.showProduct)
                }}
            >
                S H O P
            </button>
        </>
    )
}
