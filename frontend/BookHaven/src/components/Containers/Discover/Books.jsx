import { Box, Typography, Divider, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { initializeBooks } from '../../../reducers/bookReducer';
import BookCardModel from './BookCardModel';
import { SearchBar, FilterByGenre, FilterByPageCount } from './FilterBooks';

const Text = () => {
    return (
        <Box sx={{ marginTop: "40px", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '320px' }}>
            <Typography variant="h2" color="primary" gutterBottom>
                Discover
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
                Explore new worlds and uncover hidden gems tailored just for you. Based on your reading history and preferences, we&apos;ve curated a selection of books you&apos;ll love. Happy exploring!
            </Typography>
            <Divider sx={{ marginTop: "25px", width: '100%' }} />
        </Box>
    );
}

const Books = () => {
    const dispatch = useDispatch();
    const allBooks = useSelector((state) => state.books);
    const [genre, setGenre] = useState('');
    const [pageCount, setPageCount] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 8;

    useEffect(() => {
        dispatch(initializeBooks());
    }, [dispatch]);

    const handleGenreChange = (newGenre) => {
        setGenre(newGenre);
    };

    const handlePageCountChange = (newPageCount) => {
        setPageCount(newPageCount);
    }


    const getFilteredBooksByPageCount = (books, pageCountRange) => {
        if (!pageCountRange) return books;

        if (pageCountRange === "500+") {
            return books.filter(book => book.pageCount >= 500);
        }

        const [minPages, maxPages] = pageCountRange.split('-').map(Number);
        return books.filter(book => book.pageCount >= minPages && book.pageCount <= maxPages);
    };

    let filteredBooks = allBooks;
    if (genre) {
        filteredBooks = filteredBooks.filter(book => book.genre === genre);
    }
    filteredBooks = getFilteredBooksByPageCount(filteredBooks, pageCount);

    const pagecount = Math.ceil(filteredBooks.length / booksPerPage);

    return (
        <>
            <Text />
            <SearchBar />
            <FilterByGenre onGenreChange={handleGenreChange} />
            <FilterByPageCount onPageCountChange={handlePageCountChange} />
            <Box sx={{ height: '1000px' }}>
                <div style={{ marginLeft: 400 }}>
                    {filteredBooks
                        .slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage)
                        .map(b => (
                            <div key={b.id} style={{ marginBottom: '50px' }}>
                                <BookCardModel bookId={b.id} />
                            </div>
                        ))}
                </div>
                <Pagination
                    count={pagecount}
                    page={currentPage}
                    onChange={(event, page) => {
                        setCurrentPage(page);
                        window.scrollTo(0, 0);
                    }}
                    color="primary"
                    style={{ marginTop: '20px', justifyContent: 'center', display: 'flex' }}
                />
            </Box>
        </>
    );
};

export default Books;