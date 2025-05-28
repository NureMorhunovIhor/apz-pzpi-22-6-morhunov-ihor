import {MenuItem, Select, TableCell, TextField} from '@mui/material';
import type {User} from "../types.ts";
import ListPage from "./ListPage.tsx";
import NavDrawer from "./NavDrawer.tsx";


function UsersPage() {
    return (
        <>
            <NavDrawer/>
            <ListPage
                name="User"
                apiPath="api/users"
                allowCreate={false}
                allowUpdate={true}
                allowDelete={true}
                emptyObj={{
                    id: 0,
                    phone: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    role: "client",
                    password : ""
                }}
                renderTableHead={() => {
                    return (
                        <>
                            <TableCell>Phone</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                        </>
                    );
                }}
                renderTableRow={(obj: User) => {
                    return (
                        <>
                            <TableCell>{obj.phone}</TableCell>
                            <TableCell>{obj.firstName}</TableCell>
                            <TableCell>{obj.lastName}</TableCell>
                            <TableCell>{obj.email}</TableCell>
                            <TableCell>{obj.role}</TableCell>
                        </>
                    );
                }}
                renderUpdateFields={(newObj: User, setNewObj) => {
                    return (
                        <>
                            <TextField label="Phone" value={newObj.phone} onChange={(e) => setNewObj({ ...newObj, phone: e.target.value })} />
                            <TextField label="First Name" value={newObj.firstName} onChange={(e) => setNewObj({ ...newObj, firstName: e.target.value })} />
                            <TextField label="Last Name" value={newObj.lastName} onChange={(e) => setNewObj({ ...newObj, lastName: e.target.value })} />
                            <TextField label="Email" value={newObj.email} onChange={(e) => setNewObj({ ...newObj, email: e.target.value })} />
                            <Select
                                value={newObj.role}
                                label="Role"
                                onChange={(e) => setNewObj({ ...newObj, role: e.target.value })}
                            >
                                <MenuItem value="client">Client</MenuItem>
                                <MenuItem value="administrator">Admin</MenuItem>
                                <MenuItem value="settings_admin">Settings admin</MenuItem>
                                <MenuItem value="business_logic_admin">Business logic admin</MenuItem>
                                <MenuItem value="global_admin">Global admin</MenuItem>
                            </Select>
                            <TextField
                                label="Password"
                                type="password"
                                value={newObj.password}
                                onChange={(e) => setNewObj({ ...newObj, password: e.target.value })}
                            />
                        </>
                    );
                }}
            />
        </>
    );
}

export default UsersPage;