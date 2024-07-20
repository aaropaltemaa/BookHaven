import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Typography from '@mui/material/Typography';

const BookDialog = () => {
    const [open, setOpen] = useState(false);
    const user = useSelector(state => state.login.user);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            {user ? (
                <>
                    <Button variant="outlined" onClick={handleClickOpen} sx={{ marginLeft: "500px", width: "35%" }}>
                        Add Book
                    </Button><Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                            Add a book
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To add a book, please fill in the following fields:
                            </DialogContentText>
                            <form>
                                <input type="text" placeholder="Title" />
                                <input type="text" placeholder="Author" />
                                <input type="text" placeholder="ISBN" />
                                <input type="text" placeholder="Genre" />
                            </form>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            ) : (
                <Typography>
                    Please login to add a book to your library.
                </Typography>
            )}
        </div>
    );
}

export default BookDialog;
