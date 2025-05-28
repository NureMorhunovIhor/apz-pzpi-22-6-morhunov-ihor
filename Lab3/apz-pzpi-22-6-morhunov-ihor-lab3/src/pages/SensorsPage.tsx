import {TableCell} from '@mui/material';
import type {Sensor} from "../types.ts";
import ListPage from "./ListPage.tsx";
import NavDrawer from "./NavDrawer.tsx";

function SensorsPage() {
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
                allowCreate={false}
                allowUpdate={false}
                allowDelete={true}
                emptyObj={{
                    id: 0,
                    sensorType: '',
                    currentState: '',
                    lastUpdate: dateArrToStr([now.getFullYear(), now.getMonth()+1, now.getDate()]),
                    carId: 0,
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
                renderUpdateFields={() => {
                    return (
                        <></>
                    );
                }}
            />
        </>
    );
}

export default SensorsPage;