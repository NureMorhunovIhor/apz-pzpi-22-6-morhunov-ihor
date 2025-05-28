import {TableCell} from '@mui/material';
import type {Car} from "../types.ts";
import ListPage from "./ListPage.tsx";
import NavDrawer from "./NavDrawer.tsx";

function CarsAdminPage() {
    return (
        <>
            <NavDrawer/>
            <ListPage
                name="Car"
                apiPath="api/cars"
                allowCreate={false}
                allowUpdate={false}
                allowDelete={true}
                emptyObj={{
                    id: 0,
                    licensePlate: '',
                    brand: '',
                    model: '',
                    year: 0,
                    userId: 0,
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

export default CarsAdminPage;