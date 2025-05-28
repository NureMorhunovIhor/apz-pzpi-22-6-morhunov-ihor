import {TableCell} from '@mui/material';
import type {Incident} from "../types.ts";
import ListPage from "./ListPage.tsx";
import NavDrawer from "./NavDrawer.tsx";

function IncidentsPage() {
    const now = new Date();
    const dateArrToStr = (dateArr: number[]) => {
        return `${dateArr[0].toString().padStart(4, '0')}-${dateArr[1].toString().padStart(2, '0')}-${dateArr[2].toString().padStart(2, '0')}`;
    }

    return (
        <>
            <NavDrawer/>
            <ListPage
                name="incidents"
                apiPath="api/incidents"
                allowCreate={false}
                allowUpdate={false}
                allowDelete={true}
                emptyObj={{
                    id: 0,
                    incidentDate: dateArrToStr([now.getFullYear(), now.getMonth()+1, now.getDate()]),
                    incidentType: '',
                    description: '',
                    carId: 0,
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
                renderUpdateFields={() => {
                    return (
                        <></>
                    );
                }}
            />
        </>
    );
}

export default IncidentsPage;