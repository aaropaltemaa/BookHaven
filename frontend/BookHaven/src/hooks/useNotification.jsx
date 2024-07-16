import { useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const useNotification = () => {
    const dispatch = useDispatch()

    const notify = (message, type, timeout = 5000) => {
        dispatch(setNotification({ message, type, timeout }))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout)
    }

    return notify
}

export default useNotification;