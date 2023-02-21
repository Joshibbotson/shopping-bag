import { useParams } from "react-router-dom"

export default function ItemPage() {
    const { productId } = useParams()
    console.log(productId)
    return <>item {productId}</>
}
