import { Box, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { initializeBooks } from '../../../reducers/bookReducer';
import BookCardModel from './BookCardModel';
import { SearchBar, FilterByCriteria } from './FilterBooks';


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

const Books = () => {
    const dispatch = useDispatch();
    const allBooks = useSelector((state) => state.books);
    const [genre, setGenre] = useState('');

    useEffect(() => {
        dispatch(initializeBooks());
    }, [dispatch]);

    const handleGenreChange = (newGenre) => {
        setGenre(newGenre);
    };

    const filteredBooks = genre ? allBooks.filter(book => book.genre === genre) : allBooks;

    return (
        <>
            <Text />
            <SearchBar />
            <FilterByCriteria onGenreChange={handleGenreChange} />
            <Box sx={{ height: '1000px' }}>
                <div style={{ marginLeft: 400, marginTop: 80 }}>
                    {filteredBooks.map(b => (
                        <div key={b.id} style={{ marginBottom: '50px' }}>
                            <BookCardModel bookId={b.id} />
                        </div>
                    ))}
                </div>
            </Box>
        </>
    );
}

export default Books;