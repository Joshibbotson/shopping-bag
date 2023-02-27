import AddToBagModalSCSS from "../styles/AddToBagModal.module.scss"

export default function AddToBagModal() {
    let currentStyle = "showModal"

    function timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    const updateClassName = async () => {
        await timeout(2000)
        return (currentStyle = "hideModal")
    }
    updateClassName()

    return (
        <>
            <h1 className={AddToBagModalSCSS.currentStyle}>Added to bag!</h1>
        </>
    )
}
