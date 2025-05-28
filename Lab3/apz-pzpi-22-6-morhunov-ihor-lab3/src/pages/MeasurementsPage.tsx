import {Autocomplete, MenuItem, Select, TableCell, TextField} from '@mui/material';
import type {Measurement, Sensor} from "../types.ts";
import ListPage from "./ListPage.tsx";
import {useEffect, useState} from "react";
import NavDrawer from "./NavDrawer.tsx";

function MeasurementsPage() {
    const now = new Date();
    const dateTimeArrToStr = (dateArr: number[]) => {
        return `${dateArr[0].toString().padStart(4, '0')}-${dateArr[1].toString().padStart(2, '0')}-${dateArr[2].toString().padStart(2, '0')}T${dateArr[3].toString().padStart(2, '0')}:${dateArr[4].toString().padStart(2, '0')}:${dateArr[5].toString().padStart(2, '0')}.000`;
    }

    const token = localStorage.getItem('token');
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);

    const fetchSensors = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8081/api/sensors`, {
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
                name="measurements"
                apiPath="api/measurements"
                allowCreate={true}
                allowUpdate={false}
                allowDelete={false}
                emptyObj={{
                    id: 0,
                    readingTime: dateTimeArrToStr([now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()]),
                    parameterType: 'Tire Pressure',
                    value: 0,
                    sensorId: 0,
                }}
                renderTableHead={() => {
                    return (
                        <>
                            <TableCell>Time</TableCell>
                            <TableCell>Parameter</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Sensor Id</TableCell>
                        </>
                    );
                }}
                renderTableRow={(obj: Measurement) => {
                    return (
                        <>
                            <TableCell>{typeof obj.readingTime === "string" ? obj.readingTime : dateTimeArrToStr(obj.readingTime)}</TableCell>
                            <TableCell>{obj.parameterType}</TableCell>
                            <TableCell>{obj.value}</TableCell>
                            <TableCell>{obj.sensorId}</TableCell>
                        </>
                    );
                }}
                renderUpdateFields={(newObj: Measurement, setNewObj) => {
                    return (
                        <>
                            <TextField label="Time" value={typeof newObj.readingTime === "string" ? newObj.readingTime : dateTimeArrToStr(newObj.readingTime)} onChange={(e) => setNewObj({ ...newObj, readingTime: e.target.value })} />
                            <Select
                                value={newObj.parameterType}
                                label="Parameter"
                                onChange={(e) => setNewObj({ ...newObj, parameterType: e.target.value })}
                            >
                                <MenuItem value="Tire Pressure">Tire Pressure</MenuItem>
                                <MenuItem value="Fuel Level">Fuel Level</MenuItem>
                                <MenuItem value="Engine Temperature">Engine Temperature</MenuItem>
                            </Select>
                            <TextField label="Value" type="number" value={newObj.value} onChange={(e) => setNewObj({ ...newObj, value: Number(e.target.value) })} />
                            {newObj.id === 0 && (
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
                            )}
                        </>
                    );
                }}
            />
        </>
    );
}

export default MeasurementsPage;