
export default function RoomPlayerList({ players }) {

    return (
        <ul>
            {players?.map((player) => {
                if (player && player.id) {
                    return (
                        <li key={player.id}>{player.id}</li>
                    )
                }
            })}

        </ul>
    )

}