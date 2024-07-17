import { Divider, Grid, Container, Typography, CardContent, CardHeader, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import StyledCard from '../UI/StyledCard';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';

// Hardcoded for testing // replace with actual data from the database later

const ReadingProgressChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Books Read',
                data: [12, 19, 3, 5, 2, 3, 9, 10, 15, 20, 25, 30],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                borderRadius: 15,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false, // Allows chart to adjust to container size
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Bar data={data} options={options} />
        </div>
    );
};

const GenreDistributionChart = () => {
    const data = {
        labels: ['Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Fantasy'],
        datasets: [
            {
                label: 'Genres',
                data: [30, 20, 15, 25, 10],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)'
                ],
                hoverOffset: 100,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                borderRadius: 15,
            }
        ]
    };

    const options = {
        maintainAspectRatio: false, // Allows chart to adjust to container size
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

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
                <Typography marginTop="15px" variant="body1" color="textSecondary">You've been reading for 5 days straight.</Typography>
            </CardContent>
        </StyledCard>
    );
}

const Dashboard = () => {
    const user = useSelector((state) => state.login.user);
    const dispatch = useDispatch();

    return (
        <Container sx={{ maxWidth: "100%", overflowX: "hidden", marginLeft: "300px", marginBottom: "50px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h2" color="primary" align="left" gutterBottom>Dashboard</Typography>
                    <Typography variant="h5" color="primary" marginBottom="30px" align="left" gutterBottom>Welcome back, {user.firstName}! Ready to dive into another adventure? 📚</Typography>
                    <Box sx={{ marginRight: '-630px' }}> {/* Adjust the marginRight value as needed */}
                        <Divider />
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <BooksInLibraryCard />
                        </Grid>
                        <Grid item xs={6}>
                            <ReadingStreakCard />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ReadingProgressChart />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <GenreDistributionChart />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
