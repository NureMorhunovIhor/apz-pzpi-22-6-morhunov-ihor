import {TableCell, TextField} from '@mui/material';
import type {CarType} from "../types.ts";
import ListPage from "./ListPage.tsx";
import NavDrawer from "./NavDrawer.tsx";


function CarTypesPage() {
    return (
        <>
            <NavDrawer/>
            <ListPage
                name="Car Type"
                apiPath="api/business-logic/car-types"
                allowCreate={true}
                allowUpdate={true}
                allowDelete={true}
                emptyObj={{
                    id: 0,
                    carTypeName: "",
                    minTirePressure: 0,
                    maxTirePressure: 0,
                    minFuelLevel: 0,
                    maxFuelLevel: 0,
                    minEngineTemp: 0,
                    maxEngineTemp: 0,
                }}
                renderTableHead={() => {
                    return (
                        <>
                            <TableCell>Name</TableCell>
                            <TableCell>Minimal tire pressure</TableCell>
                            <TableCell>Maximal tire pressure</TableCell>
                            <TableCell>Minimal fuel level</TableCell>
                            <TableCell>Maximal fuel level</TableCell>
                            <TableCell>Minimal engine temp</TableCell>
                            <TableCell>Maximal engine temp</TableCell>
                        </>
                    );
                }}
                renderTableRow={(obj) => {
                    return (
                        <>
                            <TableCell>{obj.carTypeName}</TableCell>
                            <TableCell>{obj.minTirePressure}</TableCell>
                            <TableCell>{obj.maxTirePressure}</TableCell>
                            <TableCell>{obj.minFuelLevel}</TableCell>
                            <TableCell>{obj.maxFuelLevel}</TableCell>
                            <TableCell>{obj.minEngineTemp}</TableCell>
                            <TableCell>{obj.maxEngineTemp}</TableCell>
                        </>
                    );
                }}
                renderUpdateFields={(newObj: CarType, setNewObj) => {
                    return (
                        <>
                            <TextField label="Name" value={newObj.carTypeName} onChange={(e) => setNewObj({ ...newObj, carTypeName: e.target.value })} />
                            <TextField label="Min tire pressure" type="number" value={newObj.minTirePressure} onChange={(e) => setNewObj({ ...newObj, minTirePressure: Number(e.target.value) })} />
                            <TextField label="Max tire pressure" type="number" value={newObj.maxTirePressure} onChange={(e) => setNewObj({ ...newObj, maxTirePressure: Number(e.target.value) })} />
                            <TextField label="Min fuel level" type="number" value={newObj.minFuelLevel} onChange={(e) => setNewObj({ ...newObj, minFuelLevel: Number(e.target.value) })} />
                            <TextField label="Max fuel level" type="number" value={newObj.maxFuelLevel} onChange={(e) => setNewObj({ ...newObj, maxFuelLevel: Number(e.target.value) })} />
                            <TextField label="Min engine temp" type="number" value={newObj.minEngineTemp} onChange={(e) => setNewObj({ ...newObj, minEngineTemp: Number(e.target.value) })} />
                            <TextField label="Max engine temp" type="number" value={newObj.maxEngineTemp} onChange={(e) => setNewObj({ ...newObj, maxEngineTemp: Number(e.target.value) })} />
                        </>
                    );
                }}
            />
        </>
    );
}

export default CarTypesPage;