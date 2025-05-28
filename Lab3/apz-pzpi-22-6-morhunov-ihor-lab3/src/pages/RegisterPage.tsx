import { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8081/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, firstName, lastName, role: "client" }),
            });
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('role', data.role);
                navigate('/cars');
            } else {
                setErrorDialogOpen(true);
            }
        } catch (err) {
            console.error(err);
            setErrorDialogOpen(true);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={5} display="flex" flexDirection="column" gap={2}>
                <Typography variant="h4">Register</Typography>
                <TextField label="First Name" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <TextField label="Last Name" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" onClick={handleRegister}>Register</Button>
                <Typography onClick={() => navigate("/login")}>Login instead</Typography>
            </Box>

            <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                <DialogTitle>Registration Error</DialogTitle>
                <DialogContent>Registration failed. Please check your credentials and try again.</DialogContent>
                <DialogActions>
                    <Button onClick={() => setErrorDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default RegisterPage;