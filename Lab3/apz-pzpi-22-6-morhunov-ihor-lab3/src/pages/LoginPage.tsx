import {useNavigate} from "react-router";
import {useState} from "react";
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8081/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
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
                <Typography variant="h4">Login</Typography>
                <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" onClick={handleLogin}>Login</Button>
                <Typography onClick={() => navigate("/register")}>Register instead</Typography>
            </Box>

            <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                <DialogTitle>Login Error</DialogTitle>
                <DialogContent>Login failed. Please check your credentials and try again.</DialogContent>
                <DialogActions>
                    <Button onClick={() => setErrorDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default LoginPage;