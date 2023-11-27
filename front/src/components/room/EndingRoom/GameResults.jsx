import './style.css'

function GameResults({result}) {
    return (
        <div className='box'>
            {result.map(p => {
                return  (
                <>
                {`id: ${p.playerId} , rank: #${p.rank}, score: ${p.score}`}
                <br />
                </>
                )
            })}
        </div>
    )
}

export default GameResults;