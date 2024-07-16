import NotificationBell from '../UI/Notifications/NotificationBell';
import Avatar from '@mui/material/Avatar';
import shakespeareImage from '../../assets/images/shakespeare.jpg';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import Box from '@mui/material/Box';
import StyledAppBar from '../UI/StyledAppBar';
import StyledToolBar from '../UI/StyledToolBar';

const MenuHeader = () => {
    return (
        <StyledAppBar>
            <StyledToolBar>
                <Box sx={{ flexGrow: 1 }} />
                <NotificationBell />
                <Box sx={{ width: 16 }} />
                <Avatar alt="Shakespeare" src={shakespeareImage} />
                <Box sx={{ width: 16 }} />
                <IconButton>
                    <Tooltip title="Help">
                        <HelpIcon />
                    </Tooltip>
                </IconButton>
            </StyledToolBar>
        </StyledAppBar>
    );
}

export default MenuHeader;