import NotificationBell from '../UI/Notifications/NotificationBell';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import Box from '@mui/material/Box';
import StyledAppBar from '../UI/StyledAppBar';
import StyledToolBar from '../UI/StyledToolBar';
import AuthorizationMenu from '../UI/Authorization/AuthorizationMenu';

const Header = () => {
    return (
        <StyledAppBar>
            <StyledToolBar>
                <Box sx={{ flexGrow: 1 }} />
                <NotificationBell iconColor="primary" />
                <Box sx={{ width: 16 }} />
                <AuthorizationMenu iconColor='primary' />
                <Box sx={{ width: 16 }} />
                <IconButton>
                    <Tooltip title="Help">
                        <HelpIcon color="primary" />
                    </Tooltip>
                </IconButton>
            </StyledToolBar>
        </StyledAppBar>
    );
}

export default Header;