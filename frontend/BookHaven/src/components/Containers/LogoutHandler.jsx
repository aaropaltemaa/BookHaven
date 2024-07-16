import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../reducers/loginReducer';
import useNotification from '../../hooks/useNotification';

const LogoutHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notify = useNotification();

    useEffect(() => {
        const handleLogout = () => {
            if (window.confirm('Are you sure you want to logout?')) {
                dispatch(logoutUser());
                navigate('/');
                notify('Logged out successfully', 'success');
            } else {
                navigate('/');
            }
        };

        handleLogout();
    }, [dispatch, navigate, notify]);

    return null;
};

export default LogoutHandler;