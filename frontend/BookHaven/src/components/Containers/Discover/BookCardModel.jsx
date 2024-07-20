import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BookCardModel = ({ bookId }) => {
    const book = useSelector((state) => state.books.find((book) => book.id === bookId));

    if (!book) {
        return null;
    }

    const publishedDate = new Date(book.publishedDate);

    const formattedDate = publishedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Grid container spacing={3} alignItems="center" style={{ marginLeft: "-90px" }}>
            <Grid item xs={3}>
                <Link to={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
                    <img src={book.coverImage} alt={book.title} style={{ width: '35%' }} />
                </Link>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="h4" color="primary">
                    {book.title}
                </Typography>
                <Typography variant="h6" color="primary">
                    {book.author}
                </Typography>
                <Typography variant="body1" color="primary">
                    {formattedDate}
                </Typography>
                <Typography variant="body1" color="primary">
                    {book.description}
                </Typography>
                <Link to={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="body1" color="secondary">
                        Read more
                    </Typography>
                </Link>
            </Grid>
        </Grid>
    );
};

BookCardModel.propTypes = {
    bookId: PropTypes.string.isRequired,
}

export default BookCardModel;