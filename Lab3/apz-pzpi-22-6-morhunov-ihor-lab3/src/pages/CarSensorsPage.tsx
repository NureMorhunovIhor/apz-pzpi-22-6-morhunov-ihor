import {TableCell, TextField} from '@mui/material';
import type {Sensor} from "../types.ts";
import ListPage, {API_HOST} from "./ListPage.tsx";
import {useParams} from "react-router";
import NavDrawer from "./NavDrawer.tsx";

function CarSensorsPage() {
    const {carId} = useParams();

    const now = new Date();
    const dateArrToStr = (dateArr: number[]) => {
        return `${dateArr[0].toString().padStart(4, '0')}-${dateArr[1].toString().padStart(2, '0')}-${dateArr[2].toString().padStart(2, '0')}`;
    }

    return (
        <>
            <NavDrawer/>
            <ListPage
                name="Sensor"
                apiPath="api/sensors"
                getFetchUrl={() => `${API_HOST}/api/sensors/car/${carId}`}
                allowCreate={true}
                allowUpdate={true}
                allowDelete={true}
                emptyObj={{
                    id: 0,
                    sensorType: '',
                    currentState: '',
                    lastUpdate: dateArrToStr([now.getFullYear(), now.getMonth()+1, now.getDate()]),
                    carId: Number(carId),
                }}
                renderTableHead={() => {
                    return (
                        <>
                            <TableCell>Sensor Type</TableCell>
                            <TableCell>Current State</TableCell>
                            <TableCell>Last Update</TableCell>
                            <TableCell>Car Id</TableCell>
                        </>
                    );
                }}
                renderTableRow={(obj: Sensor) => {
                    return (
                        <>
                            <TableCell>{obj.sensorType}</TableCell>
                            <TableCell>{obj.currentState}</TableCell>
                            <TableCell>{typeof obj.lastUpdate === "string" ? obj.lastUpdate : dateArrToStr(obj.lastUpdate)}</TableCell>
                            <TableCell>{obj.carId}</TableCell>
                        </>
                    );
                }}
                renderUpdateFields={(newObj: Sensor, setNewObj) => {
                    return (
                        <>
                            <TextField label="Sensor Type" value={newObj.sensorType} onChange={(e) => setNewObj({ ...newObj, sensorType: e.target.value })} />
                            <TextField label="Current State" value={newObj.currentState} onChange={(e) => setNewObj({ ...newObj, currentState: e.target.value })} />
                            <TextField label="Last Update" value={typeof newObj.lastUpdate === "string" ? newObj.lastUpdate : dateArrToStr(newObj.lastUpdate)} onChange={(e) => setNewObj({ ...newObj, lastUpdate: e.target.value })} />
                        </>
                    );
                }}
            />
        </>
    );
}

export default CarSensorsPage;