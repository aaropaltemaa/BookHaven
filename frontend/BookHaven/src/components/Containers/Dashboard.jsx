import { Divider, Grid, Container, Typography, CardContent, CardHeader, CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import StyledCard from '../UI/StyledCard';

const BooksInLibraryCard = () => {
    return (
        <StyledCard>
            <div style={{ marginBottom: "-10px" }}>
                <CardHeader title="Total Books" />
            </div>
            <CardContent >
                <Typography variant="h4">10</Typography>
                <Typography marginTop="15px" variant="body1" color="textSecondary">You have 10 books in your library.</Typography>
            </CardContent>
        </StyledCard>
    );
}

const ReadingStreakCard = () => {
    return (
        <StyledCard>
            <div style={{ marginBottom: "-10px" }}>
                <CardHeader title="Reading Streak" />
            </div>
            <CardContent >
                <Typography variant="h4">5 days</Typography>
                <Typography marginTop="15px" variant="body1" color="textSecondary">You&apos;ve been reading for 5 days straight.</Typography>
            </CardContent>
        </StyledCard>
    );
}

const Dashboard = () => {
    const user = useSelector((state) => state.login.user);
    const dispatch = useDispatch();

    return (
        <Container sx={{ marginLeft: "300px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginBottom: "600px" }}>
                    <Typography variant="h2" color="primary" align="left" gutterBottom>Dashboard</Typography>
                    <Typography variant="h5" color="primary" marginBottom="30px" align="left" gutterBottom>Welcome back, {user.firstName}! Ready to dive into another adventure? 📚</Typography>
                    <Divider />
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <BooksInLibraryCard />
                        </Grid>
                        <Grid item xs={6}>
                            <ReadingStreakCard />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;