import Navbar from "../../components/layout/Navbar";
import CreateRoom from "../../components/room/createRoom/CreateRoom";
import FakeTetrisBoard from "../../components/tetris/FakeTetrisBoard";
import { routes } from "../../routes/route.constant";

export default function Home() {
    return (
        <>
            <Navbar routes={routes} />
            <div>
                Home
            </div>

            <CreateRoom></CreateRoom>

            <FakeTetrisBoard key={'unsafe'} height={20} width={10} playerId={'unsafe'} isControlled={true} />

        </>
    )
}