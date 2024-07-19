import { Box, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initializeBooks } from '../../../reducers/bookReducer';
import BookCardModel from './BookCardModel';
import { SearchBar } from './FilterBooks';

const Text = () => {
    return (
        <Box sx={{ marginTop: "40px", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '320px' }}>
            <Typography variant="h2" color="primary" gutterBottom>
                Explore
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
                Discover new worlds and uncover hidden gems tailored just for you. Based on your reading history and preferences, we&apos;ve curated a selection of books you&apos;ll love. Happy exploring!
            </Typography>
            <Divider sx={{ marginTop: "25px", width: '100%' }} />
        </Box>
    );
}

const FetchBooks = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books)

    useEffect(() => {
        dispatch(initializeBooks());
    }, [dispatch]);

    return (
        <div style={{ marginLeft: 400, marginTop: 80 }}>
            {books.map(b => (
                <div key={b.id} style={{ marginBottom: '50px' }}>
                    <BookCardModel bookId={b.id} />
                </div>
            ))}
        </div>
    );
}


const Books = () => {
    return (
        <div>
            <Text />
            <SearchBar />
            <FetchBooks />
        </div>
    );
}

export default Books;