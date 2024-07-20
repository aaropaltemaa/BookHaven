import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

const DrawerHelper = () => {
    const menuItems = [
        { text: "My Library", icon: <LibraryBooksIcon style={{ color: '#bcbcbc' }} />, path: "/library" },
        { text: "Discover", icon: <SearchIcon style={{ color: '#bcbcbc' }} />, path: "/discover" },
        { text: "Wishlist", icon: <FavoriteIcon style={{ color: '#bcbcbc' }} />, path: "/wishlist" },
        { text: "Settings", icon: <SettingsIcon style={{ color: '#bcbcbc' }} />, path: "/settings" },
        { text: "Help & Support ", icon: <HelpIcon style={{ color: '#bcbcbc' }} />, path: "/help" }
    ];

    return menuItems;
};

export default DrawerHelper;