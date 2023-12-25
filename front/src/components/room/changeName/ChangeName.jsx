import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSocket } from "../../../context/SocketContext";
import { useCallback, useEffect } from "react";
import { setPlayerName } from "../../../slice/tetrisSlice";

const ChangeName = () => {
    const { register, handleSubmit } = useForm();
    const { socket } = useSocket();
    const dispatch = useDispatch();

    const submitForm = useCallback((data) => {
        if (socket) {
            socket.emit('change_pseudo', data.name)
        }
    }, [socket])

    const changeName = useCallback((payload) => {
        console.log('[change_pseudo]');

        dispatch(setPlayerName(payload));
    }, [dispatch]);

    useEffect(() => {
        if (socket) {
            socket.on('change_pseudo', changeName);

            return () => {
                socket.off('change_pseudo');
            }
        }
    }, [socket, changeName]);

    return (
        <div>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className='form-group'>
                    <label htmlFor='text'>new name</label>
                    <input
                        type='text'
                        className='form-input'
                        {...register('name')}
                        required
                    />
                </div>
                <button type='submit' className='button'>
                    change_pseudo
                </button>
            </form>
        </div>
    )
}
export default ChangeName;