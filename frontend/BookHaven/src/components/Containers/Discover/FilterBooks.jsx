import Autocomplete from '@mui/material/Autocomplete';
import { Link } from 'react-router-dom';
import { TextField, Card, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeBooks } from '../../../reducers/bookReducer';

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
