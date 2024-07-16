import { useState } from 'react';

const usePopover = () => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        anchorEl,
        handleOpen,
        handleClose
    }
}

export default usePopover;