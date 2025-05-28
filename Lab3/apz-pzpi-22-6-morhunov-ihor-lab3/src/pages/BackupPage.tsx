import { useState } from 'react';
import { Container, Typography, Button, Box, Snackbar, Alert } from '@mui/material';

const BackupPage = () => {
    const token = localStorage.getItem('token');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as ("success" | "error") });

    const handleClose = () => setSnackbar({ ...snackbar, open: false });

    const handleBackup = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8081/api/settings/backup', {
                //method: 'POST',
                headers: {'Authorization': `Bearer ${token}`},
            });
            if (res.ok) {
                setSnackbar({ open: true, message: 'Backup created successfully!', severity: 'success' });
            } else {
                setSnackbar({ open: true, message: 'Failed to create backup', severity: 'error' });
            }
        } catch (err) {
            setSnackbar({ open: true, message: `Error during backup: ${err}`, severity: 'error' });
        }
    };

    const handleRestore = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8081/api/settings/restore', {
                method: 'POST',
                headers: {'Authorization': `Bearer ${token}`, "content-type": "application/json"},
                body: JSON.stringify({"backupContent": "", "backupPath": ""})
            });
            if (res.ok) {
                setSnackbar({ open: true, message: 'Restore completed successfully!', severity: 'success' });
            } else {
                setSnackbar({ open: true, message: 'Failed to restore backup', severity: 'error' });
            }
        } catch (err) {
            setSnackbar({ open: true, message: `Error during restore: ${err}`, severity: 'error' });
        }
    };

    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4">Backup Settings</Typography>
                <Box mt={3} display="flex" gap={2}>
                    <Button variant="contained" color="primary" onClick={handleBackup}>Create Backup</Button>
                    <Button variant="contained" color="secondary" onClick={handleRestore}>Restore Backup</Button>
                </Box>
            </Box>
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default BackupPage;