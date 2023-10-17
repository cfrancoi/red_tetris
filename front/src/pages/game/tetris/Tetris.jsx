import TetrisTable from "../../../components/tetris/TetrisTable";


export default function Tetris() {

    return (
        <>
            <TetrisTable height={20} width={10} playerId={0} isControlled={true}/>
            <TetrisTable height={20} width={10} playerId={1}/>
        </>
    )
}