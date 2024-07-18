import { Box, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';

const HeaderSection = ({ title, subtitle }) => {
    return (
        <Box sx={{ marginBottom: "730px", marginLeft: "330px" }}>
            <Typography variant="h2" color="primary" align="left" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h5" color="primary" align="left" gutterBottom>
                {subtitle}
            </Typography>
            <Divider sx={{ marginTop: "29px", marginRight: "-950px" }} />
        </Box>
    );
};

HeaderSection.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};

export default HeaderSection;