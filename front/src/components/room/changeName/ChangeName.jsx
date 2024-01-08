import { useForm } from "react-hook-form";
import { useSocket } from "../../../context/SocketContext";
import { useCallback } from "react";

const ChangeName = () => {
    const { register, handleSubmit } = useForm();
    const { socket } = useSocket();

    const submitForm = useCallback((data) => {
        if (socket) {
            socket.emit('change_pseudo', data.name)
        }
    }, [socket]);

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