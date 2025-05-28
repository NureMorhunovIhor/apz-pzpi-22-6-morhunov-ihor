import {MenuItem, Select, TableCell, TextField} from '@mui/material';
import type {Policy} from "../types.ts";
import ListPage from "./ListPage.tsx";
import NavDrawer from "./NavDrawer.tsx";

function PoliciesAdminPage() {
    const now = new Date();
    const dateArrToStr = (dateArr: number[]) => {
        return `${dateArr[0].toString().padStart(4, '0')}-${dateArr[1].toString().padStart(2, '0')}-${dateArr[2].toString().padStart(2, '0')}`;
    }

    return (
        <>
            <NavDrawer/>
            <ListPage
                name="policy"
                apiPath="api/policies"
                allowCreate={false}
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
                        </>
                    );
                }}
                renderUpdateFields={(newObj: Policy, setNewObj) => {
                    return (
                        <>
                            <TextField label="Start Date" value={typeof newObj.startDate === "string" ? newObj.startDate : dateArrToStr(newObj.startDate)} onChange={(e) => setNewObj({ ...newObj, startDate: e.target.value })} />
                            <TextField label="End Date" value={typeof newObj.endDate === "string" ? newObj.endDate : dateArrToStr(newObj.endDate)} onChange={(e) => setNewObj({ ...newObj, endDate: e.target.value })} />
                            <Select
                                value={newObj.status}
                                label="Status"
                                onChange={(e) => setNewObj({ ...newObj, status: e.target.value })}
                            >
                                <MenuItem value="pending">Pending</MenuItem>
                                <MenuItem value="approved">Approved</MenuItem>
                                <MenuItem value="rejected">Rejected</MenuItem>
                            </Select>
                        </>
                    );
                }}
            />
        </>
    );
}

export default PoliciesAdminPage;