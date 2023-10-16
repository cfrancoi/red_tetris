import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSocket } from "../../../context/SocketContext";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SET_ROOM } from "../../../actions/tetris.types";

const CreateRoom = () => {
    const { register, handleSubmit } = useForm();
    const { socket } = useSocket();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitForm = useCallback((data) => {
        if (socket) {
            socket.emit('requestRoom', data.roomId)
        }
    }, [socket])

    //TODO check for better way
    const joinRoom = useCallback((roomId) => {
        dispatch({ type: SET_ROOM, id: roomId });
        navigate(`rooms/${roomId}`);
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
        <>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className='form-group'>
                    <label htmlFor='text'>name </label>
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
        </>

    )
}
export default CreateRoom;