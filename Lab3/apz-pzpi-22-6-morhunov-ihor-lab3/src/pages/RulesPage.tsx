import {TableCell, TextField} from '@mui/material';
import type {Rule} from "../types.ts";
import ListPage from "./ListPage.tsx";
import NavDrawer from "./NavDrawer.tsx";


function RulesPage() {
    return (
        <>
            <NavDrawer/>
            <ListPage
                name="Rule"
                apiPath="api/business-logic/rules"
                allowCreate={true}
                allowUpdate={true}
                allowDelete={true}
                emptyObj={{
                    id: 0,
                    carType: "",
                    formula: "",
                    technicalFactorThreshold: 0,
                    technicalFactorMultiplier: 0,
                    basePrice: 0,
                }}
                renderTableHead={() => {
                    return (
                        <>
                            <TableCell>Car Type</TableCell>
                            <TableCell>Formula</TableCell>
                            <TableCell>Technical Factor Threshold</TableCell>
                            <TableCell>Technical Factor Multiplier</TableCell>
                            <TableCell>Base Price</TableCell>
                        </>
                    );
                }}
                renderTableRow={(obj: Rule) => {
                    return (
                        <>
                            <TableCell>{obj.carType}</TableCell>
                            <TableCell>{obj.formula}</TableCell>
                            <TableCell>{obj.technicalFactorThreshold}</TableCell>
                            <TableCell>{obj.technicalFactorMultiplier}</TableCell>
                            <TableCell>{obj.basePrice}</TableCell>
                        </>
                    );
                }}
                renderUpdateFields={(newObj: Rule, setNewObj) => {
                    return (
                        <>
                            <TextField
                                label="Car Type"
                                value={newObj.carType}
                                onChange={(e) =>
                                    setNewObj({ ...newObj, carType: e.target.value })
                                }
                            />
                            <TextField
                                label="Formula"
                                value={newObj.formula}
                                onChange={(e) =>
                                    setNewObj({ ...newObj, formula: e.target.value })
                                }
                            />
                            <TextField
                                label="Technical Factor Threshold"
                                type="number"
                                inputProps={{ step: "any" }}
                                value={newObj.technicalFactorThreshold}
                                onChange={(e) =>
                                    setNewObj({ ...newObj, technicalFactorThreshold: Number(e.target.value) })
                                }
                            />
                            <TextField
                                label="Technical Factor Multiplier"
                                type="number"
                                inputProps={{ step: "any" }}
                                value={newObj.technicalFactorMultiplier}
                                onChange={(e) =>
                                    setNewObj({ ...newObj, technicalFactorMultiplier: Number(e.target.value) })
                                }
                            />
                            {newObj.id === 0 && (
                                <TextField
                                    label="Base Price"
                                    type="number"
                                    inputProps={{ step: "any" }}
                                    value={newObj.basePrice}
                                    onChange={(e) =>
                                        setNewObj({ ...newObj, basePrice: Number(e.target.value) })
                                    }
                                />
                            )}
                        </>
                    );
                }}

            />
        </>
    );
}

export default RulesPage;