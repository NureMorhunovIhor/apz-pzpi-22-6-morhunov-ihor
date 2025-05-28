import {Autocomplete, TableCell, TextField} from '@mui/material';
import type {Incident, Sensor} from "../types.ts";
import ListPage, {API_HOST} from "./ListPage.tsx";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import NavDrawer from "./NavDrawer.tsx";

function CarIncidentsPage() {
    const {carId} = useParams();

    const now = new Date();
    const dateArrToStr = (dateArr: number[]) => {
        return `${dateArr[0].toString().padStart(4, '0')}-${dateArr[1].toString().padStart(2, '0')}-${dateArr[2].toString().padStart(2, '0')}`;
    }

    const token = localStorage.getItem('token');
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

    const fetchSensors = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8081/api/sensors/car/${carId}`, {
                headers: {'Authorization': `Bearer ${token}`},
            });
            if (response.ok) {
                const data = await response.json();
                setSensors(data);
            } else {
                console.error('Failed to fetch car types');
            }
        } catch (error) {
            console.error('Error fetching car types:', error);
        }
    };

    useEffect(() => {
        fetchSensors();
    }, []);

    return (
        <>
            <NavDrawer/>
            <ListPage
                name="incidents"
                apiPath="api/incidents"
                getFetchUrl={() => `${API_HOST}/api/incidents/car/${carId}`}
                allowCreate={true}
                allowUpdate={true}
                allowDelete={false}
                emptyObj={{
                    id: 0,
                    incidentDate: dateArrToStr([now.getFullYear(), now.getMonth()+1, now.getDate()]),
                    incidentType: '',
                    description: '',
                    carId: Number(carId),
                    sensorId: 0,
                }}
                renderTableHead={() => {
                    return (
                        <>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Car Id</TableCell>
                            <TableCell>Sensor Id</TableCell>
                        </>
                    );
                }}
                renderTableRow={(obj: Incident) => {
                    return (
                        <>
                            <TableCell>{typeof obj.incidentDate === "string" ? obj.incidentDate : dateArrToStr(obj.incidentDate)}</TableCell>
                            <TableCell>{obj.incidentType}</TableCell>
                            <TableCell>{obj.description}</TableCell>
                            <TableCell>{obj.carId}</TableCell>
                            <TableCell>{obj.sensorId}</TableCell>
                        </>
                    );
                }}
                renderUpdateFields={(newObj: Incident, setNewObj) => {
                    return (
                        <>
                            <TextField label="Date" value={typeof newObj.incidentDate === "string" ? newObj.incidentDate : dateArrToStr(newObj.incidentDate)} onChange={(e) => setNewObj({ ...newObj, incidentDate: e.target.value })} />
                            <TextField label="Type" value={newObj.incidentType} onChange={(e) => setNewObj({ ...newObj, incidentType: e.target.value })} />
                            <TextField label="Description" value={newObj.description} onChange={(e) => setNewObj({ ...newObj, description: e.target.value })} />
                            <Autocomplete
                                options={sensors}
                                getOptionLabel={(option) => option.sensorType || ''}
                                value={selectedSensor}
                                onChange={(_, newValue) => {
                                    (newValue != null) && setNewObj({...newObj, sensorId: newValue.id});
                                    setSelectedSensor(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Sensor" />}
                            />
                        </>
                    );
                }}
            />
        </>
    );
}

export default CarIncidentsPage;