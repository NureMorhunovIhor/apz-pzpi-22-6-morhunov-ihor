import {TableCell} from '@mui/material';
import type {Maintenance} from "../types.ts";
import ListPage from "./ListPage.tsx";
import NavDrawer from "./NavDrawer.tsx";

function MaintenancePage() {
    const now = new Date();
    const dateArrToStr = (dateArr: number[]) => {
        return `${dateArr[0].toString().padStart(4, '0')}-${dateArr[1].toString().padStart(2, '0')}-${dateArr[2].toString().padStart(2, '0')}`;
    }

    return (
        <>
            <NavDrawer/>
            <ListPage
                name="Sensor"
                apiPath="api/maintenance"
                allowCreate={false}
                allowUpdate={false}
                allowDelete={true}
                emptyObj={{
                    id: 0,
                    maintenanceDate: dateArrToStr([now.getFullYear(), now.getMonth()+1, now.getDate()]),
                    maintenanceType: '',
                    description: '',
                    cost: 0,
                    carId: 0,
                }}
                renderTableHead={() => {
                    return (
                        <>
                            <TableCell>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Car Id</TableCell>
                        </>
                    );
                }}
                renderTableRow={(obj: Maintenance) => {
                    return (
                        <>
                            <TableCell>{typeof obj.maintenanceDate === "string" ? obj.maintenanceDate : dateArrToStr(obj.maintenanceDate)}</TableCell>
                            <TableCell>{obj.maintenanceType}</TableCell>
                            <TableCell>{obj.description}</TableCell>
                            <TableCell>{obj.cost}</TableCell>
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

export default MaintenancePage;