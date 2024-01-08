import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSocket } from "../../../context/SocketContext";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPlayerToRoom, setGameState, setRoomId } from "../../../slice/tetrisSlice";

const CreateRoom = () => {
    const { register, handleSubmit } = useForm();
    const { socket } = useSocket();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitForm = useCallback((data) => {
        if (socket) {
            socket.emit('requestRoom', { roomId: data.roomId })
        }
    }, [socket])

    const joinRoom = useCallback((payload) => {
        console.log(payload);
        dispatch(setRoomId(payload));
        dispatch(setGameState({ gameState: payload.status }));
        dispatch(addPlayerToRoom(payload));
        navigate(`rooms/${payload.id}`);
    }, [dispatch, navigate]);

    useEffect(() => {
        if (socket) {
            socket.on('roomJoined', joinRoom);

            return () => {
                socket.off('roomJoined');
            }
        }
    }, [socket, joinRoom]);

    return (
        <div>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className='form-group'>
                    <label htmlFor='text'>room name to join/create</label>
                    <input
                        type='text'
                        className='form-input'
                        {...register('roomId')}
                        required
                    />
                </div>
                <button type='submit' className='button'>
                    create room
                </button>
            </form>
        </ div>
    )
}

export default CreateRoom;