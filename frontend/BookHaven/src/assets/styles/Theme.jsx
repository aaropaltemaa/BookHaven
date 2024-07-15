import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: blue[200],
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: "20px",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                },
                contained: {
                    "&:hover": {
                        backgroundColor: blue[800],
                    },
                },
            },
        },
    },
    typography: {
        fontFamily: 'Poppins',
        fontSize: 14,
        h1: {
            fontSize: '3.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 400,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
        },
        h6: {
            fontSize: '1.15rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
        },
        body2: {
            fontSize: '0.875rem',
        },
    },
});

export default theme;