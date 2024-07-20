import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from "@mui/icons-material";

const LibraryBookCardModel = ({ bookId, status }) => {
    const book = useSelector((state) => state.library.find((book) => book.id === bookId));

    if (!book) {
        return null;
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case "currently reading":
                return { color: 'orange' };
            case "finished":
                return { color: 'green' };
            case "plan to read":
                return { color: 'blue' };
            default:
                return { color: 'grey' };
        }
    };

    const publishedDate = new Date(book.publishedDate);

    const formattedDate = publishedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <Grid container spacing={3} sx={{ marginLeft: -3, marginTop: 2, width: '100%' }}>
                <Grid item xs={3}>
                    <Link to={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
                        <img src={book.coverImage} alt={book.title} style={{ width: '60%' }} />
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
                    <Grid container justifyContent="flex-end">
                        <Typography variant="body2" style={getStatusStyle(status)}>
                            Status: {status}
                        </Typography>
                        <DeleteOutlined sx={{ color: "black", marginTop: "-120px" }} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

LibraryBookCardModel.propTypes = {
    bookId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
};

export default LibraryBookCardModel;
