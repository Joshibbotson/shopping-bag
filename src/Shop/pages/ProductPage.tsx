import { useOutletContext, useParams } from "react-router-dom"

export default function ProductPage() {
    const { productId } = useParams()
    // const showProductArr = useOutletContext()

    console.log(productId)
    return (
        <>
            item {productId}
            <button onClick={() => {}}>S H O P</button>
        </>
    )
}
