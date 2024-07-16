import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BasicMenu from '../../Containers/BasicMenu';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import usePopover from '../../../hooks/usePopover';
import { useSelector } from 'react-redux';

const AuthorizationMenu = ({ iconColor }) => {
    const user = useSelector(state => state.login.user);

    const authLabels = [
        {
            id: 0,
            label: "Profile",
            path: "/profile"
        },
        {
            id: 1,
            label: "My Library",
            path: "/my-library"
        },
        user ? {
            id: 2,
            label: "Logout",
            path: "/logout" // Assuming you have a route to handle logout
        } : {
            id: 2,
            label: "Login",
            path: "/login"
        }
    ];

    const { open, anchorEl, handleOpen, handleClose } = usePopover();

    return (
        <div>
            <Tooltip title="User Profile" >
                <IconButton
                    color={iconColor}
                    onClick={handleOpen}
                >
                    <AccountCircleIcon />
                </IconButton>
            </Tooltip>
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                menuItems={authLabels}
            />
        </div>
    );
}

AuthorizationMenu.propTypes = {
    iconColor: PropTypes.string.isRequired
}

export default AuthorizationMenu;