import Line from "./Line";

export default function PreviewNextPiece({ piece }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {piece?.map((line, index) => {
                return (
                    <div key={index}>
                        <Line line={line?.map((cell) => {
                            return { type: cell };
                        })} isOpponent={false} />
                    </div>
                );
            })}
        </div >
    )
}
