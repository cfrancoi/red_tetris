
import { useParams } from "react-router-dom";

export default function Room() {

    let { roomId } = useParams();

    return (
        <>
            {roomId}
        </>
    )

}