import { useOutletContext, useParams } from "react-router-dom"

export default function ProductPage() {
    const { productId } = useParams()

    console.log(productId)
    return <>item {productId}</>
}
