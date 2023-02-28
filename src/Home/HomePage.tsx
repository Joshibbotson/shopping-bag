import homeSCSS from "./style/Home.module.scss"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <>
            <main className={homeSCSS.homeMain}>
                <section className={homeSCSS.homeSection}>
                    <h1>Everything, Everywhere All at Once</h1>
                    <p>
                        Delivered straight to your door, experience your next
                        consumer high
                    </p>
                    <Link to={"shop"}>Start Shopping</Link>
                </section>
            </main>
        </>
    )
}
