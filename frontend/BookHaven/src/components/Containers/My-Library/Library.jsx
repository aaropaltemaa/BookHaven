import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { initializeLibrary } from '../../../reducers/libraryReducer';
import LibraryBookCardModel from './LibraryBookCardModel';
import { Box, Typography, Divider } from "@mui/material";

const Text = () => {
    return (
        <Box sx={{ marginTop: "40px", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            <Typography variant="h2" color="primary" gutterBottom>
                My Library
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
                Your personal library of books. Keep track of your reading progress and explore new worlds.
            </Typography>
            <Divider sx={{ marginTop: "25px", width: '100%' }} />
        </Box>
    );
}

const Library = () => {
    const dispatch = useDispatch();
    const library = useSelector(state => state.library);
    const userId = useSelector(state => state.login.user.id);

    useEffect(() => {
        dispatch(initializeLibrary(userId));
    }, [dispatch, userId]);

    if (!library) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '80%', margin: '0 auto', marginLeft: "320px", marginBottom: "80px" }}>
            <Text />
            <Box sx={{ marginTop: '20px', width: '100%' }}>
                {library.map(book => (
                    <LibraryBookCardModel key={book.id} bookId={book.id} status={book.status} />
                ))}
            </Box>
        </Box>
    );
};

export default Library;
