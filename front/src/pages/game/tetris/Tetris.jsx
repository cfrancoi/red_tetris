import { useSelector } from "react-redux";
import TetrisTable from "../../../components/tetris/TetrisTable";


export default function Tetris() {


    const tetris = useSelector(state => state.tetris);

    // const useSocket


    console.log(tetris.players)


    return (
        <>
            {tetris.players.map(p => {
                if (p.id) {
                    return (
                        <TetrisTable key={p.id} height={20} width={10} playerId={p.id} />
                    )
                }
            })}
            {/* <TetrisTable height={20} width={10} playerId={0} isControlled={true} />
            <TetrisTable height={20} width={10} playerId={1} /> */}
        </>
    )
}