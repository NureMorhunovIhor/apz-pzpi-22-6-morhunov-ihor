import {useEffect, useState} from 'react';
import {Autocomplete, Button, TableCell, TextField} from '@mui/material';
import type {Car, CarType} from "../types.ts";
import ListPage, {API_HOST} from "./ListPage.tsx";
import NavDrawer from "./NavDrawer.tsx";
import {useNavigate} from "react-router";

function CarsPage() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [carTypes, setCarTypes] = useState([]);
    const [selectedCarType, setSelectedCarType] = useState<CarType | null>(null);

    const fetchCarTypes = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8081/api/business-logic/car-types', {
                headers: {'Authorization': `Bearer ${token}`},
            });
            if (response.ok) {
                const data = await response.json();
                setCarTypes(data);
            } else {
                console.error('Failed to fetch car types');
            }
        } catch (error) {
            console.error('Error fetching car types:', error);
        }
    };

    useEffect(() => {
        fetchCarTypes();
    }, []);

    return (
        <>
            <NavDrawer/>
            <ListPage
                name="Car"
                apiPath="api/cars"
                getFetchUrl={(userId) => `${API_HOST}/api/cars/user/${userId}`}
                allowCreate={true}
                allowUpdate={true}
                allowDelete={true}
                emptyObj={{
                    id: 0,
                    licensePlate: '',
                    brand: '',
                    model: '',
                    year: 0,
                    userId: Number(userId),
                    carTypeId: 0,
                }}
                renderTableHead={() => {
                    return (
                        <>
                            <TableCell>License Plate</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Car Type ID</TableCell>
                            <TableCell>Car page</TableCell>
                        </>
                    );
                }}
                renderTableRow={(obj: Car) => {
                    return (
                        <>
                            <TableCell>{obj.licensePlate}</TableCell>
                            <TableCell>{obj.brand}</TableCell>
                            <TableCell>{obj.model}</TableCell>
                            <TableCell>{obj.year}</TableCell>
                            <TableCell>{obj.userId}</TableCell>
                            <TableCell>{obj.carTypeId}</TableCell>
                            <TableCell>
                                <Button variant="contained" onClick={() => {
                                    navigate(`/cars/${obj.id}`);
                                }}>Go to car page</Button>
                            </TableCell>
                        </>
                    );
                }}
                renderUpdateFields={(newObj: Car, setNewObj) => {
                    return (
                        <>
                            <TextField label="License Plate" value={newObj.licensePlate} onChange={(e) => setNewObj({ ...newObj, licensePlate: e.target.value })} />
                            <TextField label="Brand" value={newObj.brand} onChange={(e) => setNewObj({ ...newObj, brand: e.target.value })} />
                            <TextField label="Model" value={newObj.model} onChange={(e) => setNewObj({ ...newObj, model: e.target.value })} />
                            <TextField label="Year" type="number" value={newObj.year} onChange={(e) => setNewObj({ ...newObj, year: Number(e.target.value) })} />
                            <Autocomplete
                                options={carTypes}
                                getOptionLabel={(option) => option.carTypeName || ''}
                                value={selectedCarType}
                                onChange={(_, newValue) => {
                                    newValue && setNewObj({...newObj, carTypeId: newValue.id});
                                    setSelectedCarType(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Car Type" />}
                            />
                        </>
                    );
                }}
            />
        </>
    );
}

export default CarsPage;