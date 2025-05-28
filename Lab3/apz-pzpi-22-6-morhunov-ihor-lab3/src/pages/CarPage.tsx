import {useEffect, useState} from 'react';
import {Box, Button, Container, Paper, Typography} from '@mui/material';
import type {Car, CarType} from "../types.ts";
import {useNavigate, useParams} from 'react-router';
import NavDrawer from "./NavDrawer.tsx";

function CarPage() {
    const token = localStorage.getItem('token');
    const {carId} = useParams();

    const navigate = useNavigate();
    const [car, setCar] = useState<Car | null>(null);
    const [carType, setCarType] = useState<CarType | null>(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8081/api/cars/${carId}`, {
                    headers: {'Authorization': `Bearer ${token}`},
                });
                if (res.ok) {
                    const data = await res.json();
                    setCar(data);
                    fetchCarType(data.carTypeId);
                } else {
                    console.error('Failed to fetch car');
                }
            } catch (err) {
                console.error('Error fetching car:', err);
            }
        };

        const fetchCarType = async (typeId: number) => {
            try {
                const res = await fetch(`http://127.0.0.1:8081/api/business-logic/car-types/${typeId}`, {
                    headers: {'Authorization': `Bearer ${token}`},
                });
                if (res.ok) {
                    const type = await res.json();
                    setCarType(type);
                }
            } catch (err) {
                console.error('Error fetching car type:', err);
            }
        };

        fetchCar();
    }, [carId]);

    return (
        <>
            <NavDrawer/>
            <Container>
                <Box mt={2}>
                    <Typography variant="h4">Car Details</Typography>
                    <Paper sx={{ p: 2, mt: 2 }}>
                        <Typography><strong>ID:</strong> {car ? car.id : "Loading..."}</Typography>
                        <Typography><strong>License Plate:</strong> {car ? car.licensePlate : "Loading..."}</Typography>
                        <Typography><strong>Brand:</strong> {car ? car.brand : "Loading..."}</Typography>
                        <Typography><strong>Model:</strong> {car ? car.model : "Loading..."}</Typography>
                        <Typography><strong>Year:</strong> {car ? car.year : "Loading..."}</Typography>
                        <Typography><strong>Car Type:</strong> {carType ? carType.carTypeName : "Loading..."}</Typography>
                        <Box mt={2} display="flex" gap={2}>
                            <Button variant="outlined" onClick={() => navigate(`/cars/${carId}/sensors`)}>Sensors</Button>
                            <Button variant="outlined" onClick={() => navigate(`/cars/${carId}/maintenance`)}>Maintenance</Button>
                            <Button variant="outlined" onClick={() => navigate(`/cars/${carId}/incidents`)}>Incidents</Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    );
}

export default CarPage;