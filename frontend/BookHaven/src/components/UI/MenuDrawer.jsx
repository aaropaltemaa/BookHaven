import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import DrawerHelper from '../Containers/DrawerHelper';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { Link } from 'react-router-dom';

const Display = ({ menuItems, navigate }) => {
    const drawerWidth = 240;

    return (
        <Drawer variant="permanent" anchor="left"
            PaperProps={{
                sx: {
                    height: '100%',
                    width: drawerWidth,
                    backgroundColor: '#1A2E47'
                },
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', color: "#ecf0f1" }}>
                <Link to="/" >
                    <LocalLibraryIcon style={{ fontSize: '60px', marginLeft: "85px", marginTop: "30px", color: "#ecf0f1" }} />
                </Link>
                <Typography variant="h4" style={{ marginTop: '30px', marginLeft: "60px", color: "#ecf0f1" }}>
                    BookHaven
                </Typography>
                <br />
                <br />
                <List>
                    {menuItems.map((item) => (
                        <ListItem button key={item.text} onClick={() => navigate(item.path)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} primaryTypographyProps={{ style: { color: "#ecf0f1" } }} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    );
}

Display.propTypes = {
    menuItems: PropTypes.array.isRequired,
    navigate: PropTypes.func.isRequired,
}

const MenuDrawer = () => {
    const navigate = useNavigate();
    const menuItems = DrawerHelper();
    return (
        <Display menuItems={menuItems} navigate={navigate} />
    );
}

export default MenuDrawer; // Ensure to export MenuDrawer