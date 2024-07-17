import { Divider, Grid, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
    const user = useSelector((state) => state.login.user);
    const dispatch = useDispatch();

    return (
        <Container sx={{ marginLeft: "300px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ marginBottom: "600px" }}>
                    <Typography variant="h2" color="primary" align="start" gutterBottom>Dashboard</Typography>
                    <Typography variant="h5" color="primary" marginBottom="30px" align="start" gutterBottom>Welcome back, {user.name}! Ready to dive into another adventure? 📚</Typography>
                    <Divider />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;