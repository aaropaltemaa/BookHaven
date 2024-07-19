import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { initializeLibrary } from '../../../reducers/libraryReducer';
import LibraryBookCardModel from './LibraryBookCardModel';
import { Box, Typography, Divider } from "@mui/material";

const Text = () => {
    return (
        <Box sx={{ marginTop: "40px", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '320px' }}>
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
        <div >
            <Text />
            <Box sx={{ height: "1000px" }}>

                {library.map(book => (
                    <LibraryBookCardModel key={book.id} bookId={book.id} />
                ))}
            </Box>
        </div>
    );
};

export default Library;