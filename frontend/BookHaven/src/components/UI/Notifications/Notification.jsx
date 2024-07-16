import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const CenteredContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000, // Ensure it's above other content
    pointerEvents: 'none', // Allows clicking through the container if needed
});

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (!notification) {
        return null
    }

    return (
        <CenteredContainer>
            <Alert severity={notification.type} style={{ pointerEvents: 'auto', backgroundColor: '#fff', color: '#000' }}>
                {notification.message}
            </Alert>
        </CenteredContainer>
    )
}

export default Notification