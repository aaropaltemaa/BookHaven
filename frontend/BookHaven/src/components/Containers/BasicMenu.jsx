import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

const BasicMenu = ({ anchorEl, handleClose, open, menuItems }) => {

    return (
        <div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {menuItems.map((item) => (
                    <MenuItem key={item.id} onClick={handleClose}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

BasicMenu.propTypes = {
    anchorEl: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    menuItems: PropTypes.array.isRequired,

};

export default BasicMenu; 