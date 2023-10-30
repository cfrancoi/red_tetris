import { useSelector } from "react-redux";
import ButtonLeaveRoom from "../ButtonLeaveRoom";


const status = [
    "EN ATTENTE",
    "EN JEU"
]

export default function RoomStatus() {

    const tetris = useSelector(state => state.tetris);

    return (
        <div>
            {(tetris.gameState || tetris.gameState === 0 ? `${status[tetris.gameState]} ` : <></>)}
            <ButtonLeaveRoom />
        </div>
    )

}