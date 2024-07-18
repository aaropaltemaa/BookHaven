import { Grid, Typography, CardContent, CardHeader, Divider, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import StyledCard from '../UI/StyledCard';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';

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
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        responsive: true,
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            }
        },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
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
                    'rgba(0, 0, 255, 0.2)',
                    'rgba(0, 0, 255, 0.4)',
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(0, 0, 255, 0.8)',
                    'rgba(128, 128, 128, 0.2)'
                ],
                hoverOffset: 50,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                borderRadius: 15,
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

const BooksInLibraryCard = () => {
    return (
        <StyledCard>
            <CardHeader title="Total Books" />
            <CardContent>
                <Typography variant="h4">10</Typography>
                <Typography marginTop="15px" variant="body1" color="textSecondary">You have 10 books in your library.</Typography>
            </CardContent>
        </StyledCard>
    );
}

const ReadingStreakCard = () => {
    return (
        <StyledCard>
            <CardHeader title="Reading Streak" />
            <CardContent>
                <Typography variant="h4">5 days</Typography>
                <Typography marginTop="15px" variant="body1" color="textSecondary">You&apos;ve been reading for 5 days straight.</Typography>
            </CardContent>
        </StyledCard>
    );
}

const ReadingProgressCard = () => {
    return (
        <StyledCard>
            <CardHeader title="Reading Progress" />
            <CardContent sx={{ height: 250 }}>
                <ReadingProgressChart />
            </CardContent>
        </StyledCard>
    );
}

const GenreDistributionCard = () => {
    return (
        <StyledCard>
            <CardHeader title="Genre Distribution" />
            <CardContent sx={{ height: 250 }}>
                <GenreDistributionChart />
            </CardContent>
        </StyledCard>
    );
}

const Text = () => {
    const user = useSelector((state) => state.login.user);
    return (
        <Box sx={{ marginTop: "40px", display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '320px' }}>
            <Typography variant="h2" color="primary" gutterBottom>
                Dashboard
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
                Welcome back, {user.firstName}! Here&apos;s a summary of your reading activity. 📚
            </Typography>
            <Divider sx={{ marginTop: "25px", width: '82%' }} />
        </Box>
    );
}
const Dashboard = () => {
    return (
        <>
            <Text />
            <Grid container spacing={7} padding={40} sx={{ marginTop: "-350px" }}>
                <Grid item xs={6}>
                    <BooksInLibraryCard />
                </Grid>
                <Grid item xs={6}>
                    <ReadingStreakCard />
                </Grid>
                <Grid item xs={6} sx={{ marginTop: "-80px" }}>
                    <ReadingProgressCard />
                </Grid>
                <Grid item xs={6} sx={{ marginTop: "-80px" }}>
                    <GenreDistributionCard />
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;
