import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSocket } from "../../../context/SocketContext";
import { useCallback, useEffect } from "react";
import { CHANGE_PSEUDO } from "../../../actions/tetris.types";

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

        dispatch({type: CHANGE_PSEUDO, payload});

        console.log(payload)
      
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