import { Divider, Grid, Container, Typography, CardContent, CardHeader, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import StyledCard from '../UI/StyledCard';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

const BarChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Books Read',
                data: [12, 19, 3, 5, 2, 3, 9, 10, 15, 20, 25, 30],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Bar data={data} />
    );
}

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
                    <Box sx={{ marginRight: '-630px' }}> {/* Adjust the marginRight value as needed */}
                        <Divider />
                    </Box>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <BooksInLibraryCard />
                        </Grid>
                        <Grid item xs={6}>
                            <ReadingStreakCard />
                        </Grid>
                        <BarChart />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;