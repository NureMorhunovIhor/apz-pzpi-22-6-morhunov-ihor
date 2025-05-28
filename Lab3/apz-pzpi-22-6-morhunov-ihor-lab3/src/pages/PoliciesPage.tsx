import {useEffect, useState} from 'react';
import {Autocomplete, Button, TableCell, TextField} from '@mui/material';
import type {Car, Policy} from "../types.ts";
import ListPage, {API_HOST} from "./ListPage.tsx";
import {useNavigate} from "react-router";
import NavDrawer from "./NavDrawer.tsx";

function PoliciesPage() {
    const now = new Date();
    const dateArrToStr = (dateArr: number[]) => {
        return `${dateArr[0].toString().padStart(4, '0')}-${dateArr[1].toString().padStart(2, '0')}-${dateArr[2].toString().padStart(2, '0')}`;
    }

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [cars, setCars] = useState<Car[]>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const navigate = useNavigate();

    const fetchCars = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8081/api/cars/user/${userId}`, {
                headers: {'Authorization': `Bearer ${token}`},
            });
            if (response.ok) {
                const data = await response.json();
                setCars(data);
            } else {
                console.error('Failed to fetch car types');
            }
        } catch (error) {
            console.error('Error fetching car types:', error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const payPolicy = async (policy: Policy) => {
        try {
            const response = await fetch(`http://127.0.0.1:8081/api/payments/pay?total=${policy.price}&currency=USD&description=PolicyPayment&policyId=${policy.id}`, {
                method: "POST",
                headers: {'Authorization': `Bearer ${token}`},
            });
            if (response.ok) {
                const paymentUrl = await response.text();
                window.open(paymentUrl, '_blank')?.focus();
                navigate("/payments");
            } else {
                console.error('Failed to create payment');
            }
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    };

    return (
        <>
            <NavDrawer/>
            <ListPage
                name="policy"
                apiPath="api/policies"
                getFetchUrl={(userId) => `${API_HOST}/api/policies/user/${userId}`}
                allowCreate={true}
                allowUpdate={true}
                allowDelete={true}
                emptyObj={{
                    id: 0,
                    startDate: dateArrToStr([now.getFullYear(), now.getMonth()+1, now.getDate()]),
                    endDate: dateArrToStr([now.getFullYear(), now.getMonth()+1, now.getDate()]),
                    status: 'pending',
                    price: 0,
                    carId: 0,
                }}
                renderTableHead={() => {
                    return (
                        <>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Car ID</TableCell>
                            <TableCell>Payment</TableCell>
                        </>
                    );
                }}
                renderTableRow={(obj: Policy) => {
                    return (
                        <>
                            <TableCell>{typeof obj.startDate === "string" ? obj.startDate : dateArrToStr(obj.startDate)}</TableCell>
                            <TableCell>{typeof obj.endDate === "string" ? obj.endDate : dateArrToStr(obj.endDate)}</TableCell>
                            <TableCell>{obj.status}</TableCell>
                            <TableCell>{obj.price}</TableCell>
                            <TableCell>{obj.carId}</TableCell>
                            <TableCell>
                                <Button variant="contained" onClick={() => {
                                    payPolicy(obj);
                                }}>Pay</Button>
                            </TableCell>
                        </>
                    );
                }}
                renderUpdateFields={(newObj: Policy, setNewObj) => {
                    return (
                        <>
                            <TextField label="Start Date" value={typeof newObj.startDate === "string" ? newObj.startDate : dateArrToStr(newObj.startDate)} onChange={(e) => setNewObj({ ...newObj, startDate: e.target.value })} />
                            <TextField label="End Date" value={typeof newObj.endDate === "string" ? newObj.endDate : dateArrToStr(newObj.endDate)} onChange={(e) => setNewObj({ ...newObj, endDate: e.target.value })} />
                            <Autocomplete
                                options={cars}
                                getOptionLabel={(option) => option.licensePlate || ''}
                                value={selectedCar}
                                onChange={(_, newValue) => {
                                    (newValue !== null) && setNewObj({...newObj, carId: newValue.id});
                                    setSelectedCar(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Car" />}
                            />
                        </>
                    );
                }}
            />
        </>
    );
}

export default PoliciesPage;