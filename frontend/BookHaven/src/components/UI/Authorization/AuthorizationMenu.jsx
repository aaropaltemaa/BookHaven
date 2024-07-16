import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BasicMenu from '../../Containers/BasicMenu';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import usePopover from '../../../hooks/usePopover';

const AuthorizationMenu = ({ iconColor }) => {

    const authLabels = [
        {
            id: 0,
            label: "Profile"
        },
        {
            id: 1,
            label: "My Library"
        },
        {
            id: 2,
            label: "Logout"
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