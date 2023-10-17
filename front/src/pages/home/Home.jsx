import Navbar from "../../components/layout/Navbar";
import CreateRoom from "../../components/room/createRoom/CreateRoom";
import { routes } from "../../routes/route.constant";

export default function Home() {
    return(
        <>
            <Navbar routes={routes} />
            <div>
                Home
            </div>

            <CreateRoom></CreateRoom>
        </>
    )
}