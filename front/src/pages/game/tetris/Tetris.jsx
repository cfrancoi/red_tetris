import { useSelector } from "react-redux";
import TetrisBoard from "../../../components/tetris/TetrisBoard";

import './styles.css'
import PreviewNextPiece from "../../../components/tetris/PreviewNextPiece";


export default function Tetris() {
    const tetris = useSelector(state => state.tetris);

    return (
        <div className="tetris-list">
            {tetris.players.map(p => {
                if (p.me && p.inGame) {
                    return (
                        <>
                            <TetrisBoard key={p.id} height={20} width={10} playerId={p.id} isControlled={p.me} />
                            <PreviewNextPiece piece={p.nextPiece} />
                        </>
                    )
                }
            })}

            {tetris.players.map(p => {
                if (p.id && !p.me && p.inGame) {
                    return (
                        <TetrisBoard key={p.id} height={20} width={10} playerId={p.id} isControlled={false} />
                    )
                }
            })}
        </div>
    )
}