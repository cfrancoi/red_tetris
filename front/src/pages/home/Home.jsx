import Navbar from "../../components/layout/Navbar";
import { routes } from "../../routes/route.constant";

export default function Home() {
    return(
        <>
            <Navbar routes={routes} />
            <div>
                Home
            </div>
        </>
    )
}