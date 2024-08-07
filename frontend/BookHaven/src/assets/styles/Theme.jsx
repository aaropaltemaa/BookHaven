import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: "#1A2E47",
        },
        secondary: {
            main: "#407ad6",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: "10px",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    width: "100%",
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
        fontFamily: "Georgia, serif",
        fontSize: 14,
        h1: {
            fontSize: '3.5rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '1.6rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 400,
        },
        h4: {
            fontSize: '1.4rem',
            fontWeight: 500,
        },
        h5: {
            fontSize: '1.3rem',
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