import {TableCell, TextField} from '@mui/material';
import type {Maintenance} from "../types.ts";
import ListPage, {API_HOST} from "./ListPage.tsx";
import {useParams} from "react-router";
import NavDrawer from "./NavDrawer.tsx";

function CarMaintenancePage() {
    const {carId} = useParams();

    const now = new Date();
    const dateArrToStr = (dateArr: number[]) => {
        return `${dateArr[0].toString().padStart(4, '0')}-${dateArr[1].toString().padStart(2, '0')}-${dateArr[2].toString().padStart(2, '0')}`;
    }

    return (
        <>
            <NavDrawer/>
            <ListPage
                name="maintenance"
                apiPath="api/maintenance"
                getFetchUrl={() => `${API_HOST}/api/maintenance/car/${carId}`}
                allowCreate={true}
                allowUpdate={true}
                allowDelete={true}
                emptyObj={{
                    id: 0,
                    maintenanceDate: dateArrToStr([now.getFullYear(), now.getMonth()+1, now.getDate()]),
                    maintenanceType: '',
                    description: '',
                    cost: 0,
                    carId: Number(carId),
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
                renderUpdateFields={(newObj: Maintenance, setNewObj) => {
                    return (
                        <>
                            <TextField label="Date" value={typeof newObj.maintenanceDate === "string" ? newObj.maintenanceDate : dateArrToStr(newObj.maintenanceDate)} onChange={(e) => setNewObj({ ...newObj, maintenanceDate: e.target.value })} />
                            <TextField label="Type" value={newObj.maintenanceType} onChange={(e) => setNewObj({ ...newObj, maintenanceType: e.target.value })} />
                            <TextField label="Description" value={newObj.description} onChange={(e) => setNewObj({ ...newObj, description: e.target.value })} />
                            <TextField label="Cost" type="number" value={newObj.cost} onChange={(e) => setNewObj({ ...newObj, cost: Number(e.target.value) })} />
                        </>
                    );
                }}
            />
        </>
    );
}

export default CarMaintenancePage;