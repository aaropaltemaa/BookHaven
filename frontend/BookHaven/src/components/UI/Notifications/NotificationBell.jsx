import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BasicMenu from '../../Containers/BasicMenu';
import PropTypes from 'prop-types';
import { useState } from 'react';

const NotificationBell = ({ iconColor }) => {

    const notifications = [
        {
            id: 0,
            label: "Notification 1"
        },
        {
            id: 1,
            label: "Notification 2"
        }
    ]

    const newNotifications = `You have ${notifications.length} notifications`
    const noNotifications = "You have no new notifications"

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={notifications.length ? newNotifications : noNotifications} >
                <IconButton
                    color={iconColor}
                    onClick={notifications.length ? handleOpen : null}

                >
                    <Badge
                        badgeContent={notifications.length}
                        color="primary"
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                menuItems={notifications}
            />
        </div>
    );
};

NotificationBell.propTypes = {
    iconColor: PropTypes.string.isRequired,
};

export default NotificationBell;