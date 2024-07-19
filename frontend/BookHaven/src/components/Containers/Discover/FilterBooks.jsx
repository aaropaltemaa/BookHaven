import { Link } from 'react-router-dom';
import { TextField, Card, Typography, Autocomplete, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeBooks } from '../../../reducers/bookReducer';
import PropTypes from 'prop-types';

export const SearchBar = () => {
    const [jsonResults, setJsonResults] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const books = await dispatch(initializeBooks());
                setJsonResults(books || []);
                console.log("Books fetched", books);
            } catch (error) {
                console.log("Error fetching books", error);
            }
        };
        fetchBooks();
    }, [dispatch]);

    return (
        <Card sx={{ ml: "320px", width: "50%", mt: "60px" }}>
            <Autocomplete
                id="search-bar"
                options={jsonResults}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search for books"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                    />
                )}
                renderOption={(props, option) => {
                    const { title, author } = option;
                    // eslint-disable-next-line react/prop-types
                    const { key, ...restProps } = props;
                    return (
                        <Link key={option.id} to={`/books/${option.id}`} style={{ textDecoration: 'none' }}>
                            <Typography {...restProps} key={key} variant="body1">
                                {title} by {author}
                            </Typography>
                        </Link>
                    );
                }}
            />
        </Card>
    );
};

export const FilterByGenre = ({ onGenreChange }) => {
    const [genre, setGenre] = useState('');

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
        onGenreChange(event.target.value); // Notify the parent component of the genre change
    };

    return (
        <Box sx={{ minWidth: 120, ml: 200, mt: -7 }}>
            <FormControl fullWidth>
                <InputLabel id="genre-select-label">Genre</InputLabel>
                <Select
                    labelId="genre-select-label"
                    id="genre-select"
                    value={genre}
                    label="Genre"
                    onChange={handleGenreChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Fantasy">Fantasy</MenuItem>
                    <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
                    <MenuItem value="Mystery">Mystery</MenuItem>
                    <MenuItem value="Romance">Romance</MenuItem>
                    <MenuItem value="Dystopian">Dystopian</MenuItem>
                    <MenuItem value="Tragedy">Tragedy</MenuItem>
                    <MenuItem value="Adventure">Adventure</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

FilterByGenre.propTypes = {
    onGenreChange: PropTypes.func.isRequired,
};

export const FilterByPageCount = ({ onPageCountChange }) => {
    const [pageRange, setPageRange] = useState('');

    const handlePageRangeChange = (event) => {
        setPageRange(event.target.value);
        onPageCountChange(event.target.value); // Notify the parent component of the page range change
    };

    return (
        <Box sx={{ minWidth: 120, ml: 200, mt: 3 }}>
            <FormControl fullWidth>
                <InputLabel id="page-range-select-label">Page Range</InputLabel>
                <Select
                    labelId="page-range-select-label"
                    id="page-range-select"
                    value={pageRange}
                    label="Page Range"
                    onChange={handlePageRangeChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="100-200">100-200 pages</MenuItem>
                    <MenuItem value="200-300">200-300 pages</MenuItem>
                    <MenuItem value="300-400">300-400 pages</MenuItem>
                    <MenuItem value="400-500">400-500 pages</MenuItem>
                    <MenuItem value="500+">500+ pages</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

FilterByPageCount.propTypes = {
    onPageCountChange: PropTypes.func.isRequired,
};