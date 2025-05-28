import {type JSX, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

export const API_HOST = "http://127.0.0.1:8081";

export type ListPageParams<ItemType> = {
    name: string;
    apiPath: string;
    getFetchUrl?: ((userId: number) => string) | undefined;
    getCreateUrl?: ((userId: number) => string) | undefined;
    getUpdateUrl?: ((userId: number, objId: number) => string) | undefined;
    getDeleteUrl?: ((userId: number, objId: number) => string) | undefined;
    allowCreate: boolean;
    allowUpdate: boolean;
    allowDelete: boolean;
    emptyObj: ItemType & {id: number};
    renderTableHead: () => JSX.Element,
    renderTableRow: (obj: ItemType) => JSX.Element,
    renderUpdateFields: (newObj: ItemType, setNewObj: (newObj: ItemType) => void) => JSX.Element,
};

function ListPage<ItemType>(params: ListPageParams<ItemType>) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const [objs, setObjs] = useState<(ItemType & {id: number})[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newObj, setNewObj] = useState<ItemType & {id: number}>({...params.emptyObj});

    const getFetchUrl = params.getFetchUrl || (() => `${API_HOST}/${params.apiPath}`);
    const getCreateUrl = params.getCreateUrl || (() =>  `${API_HOST}/${params.apiPath}`);
    const getUpdateUrl = params.getUpdateUrl || ((_: number, objId: number) =>  `${API_HOST}/${params.apiPath}/${objId}`);
    const getDeleteUrl = params.getDeleteUrl || ((_: number, objId: number) =>  `${API_HOST}/${params.apiPath}/${objId}`);

    const navigate = useNavigate();

    const fetchObjs = async () => {
        try {
            const response = await fetch(getFetchUrl(Number(userId!)), {
                headers: {'Authorization': `Bearer ${token}`},
            });
            if (response.ok) {
                const data = await response.json();
                setObjs(data);
            } else {
                console.error(`Failed to fetch ${params.name}s`);
            }
        } catch (error) {
            console.error(`Error fetching ${params.name}s:`, error);
        }
    };

    useEffect(() => {
        if(!token || !userId) {
            navigate("/login");
            return;
        }

        fetchObjs();
    }, [token, userId]);

    const handleCreateUpdateObj = async () => {
        if (!userId || !token) return;
        const userIdN = Number(userId!);

        const {id: objId, ...payload} = newObj;

        const req = fetch(
            objId === 0 ? getCreateUrl(userIdN) : getUpdateUrl(userIdN, objId),
            {
                method: objId === 0 ? "POST" : "PUT",
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify(payload),
            }
        );

        try {
            const res = await req;
            if (res.ok) {
                setDialogOpen(false);
                setNewObj({...params.emptyObj});
                fetchObjs();
            } else {
                console.error(`Failed to create/update ${params.name}s`);
            }
        } catch (err) {
            console.error(`Error creating/updating ${params.name}s:`, err);
        }
    };

    const handleDeleteObj = async (objId: number) => {
        if (!userId || !token) return;
        const userIdN = Number(userId!);

        try {
            const res = await fetch(getDeleteUrl(userIdN, objId), {
                method: "DELETE",
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            });
            if (res.ok) {
                fetchObjs();
            } else {
                console.error(`Failed to delete ${params.name}`);
            }
        } catch (err) {
            console.error(`Error delete ${params.name}:`, err);
        }
    };

    const bigName = params.name.slice(0, 1).toUpperCase() + params.name.slice(1);

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">{bigName}s</Typography>
                {params.allowCreate && (
                    <Button variant="contained" onClick={() => {
                        setNewObj({...params.emptyObj});
                        setDialogOpen(true);
                    }}>Add {bigName}</Button>
                )}
            </Box>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            {params.renderTableHead()}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {objs.map((obj) => (
                            <TableRow key={obj.id}>
                                <TableCell>{obj.id}</TableCell>
                                {params.renderTableRow(obj)}
                                <TableCell>
                                    <div style={{display: "flex", flexDirection: "row", gap: "1em"}}>
                                        {params.allowUpdate && (
                                            <Button variant="contained" onClick={() => {
                                                setNewObj(obj);
                                                setDialogOpen(true);
                                            }}>Edit</Button>
                                        )}
                                        {params.allowDelete && (
                                            <Button variant="contained" onClick={() => {
                                                handleDeleteObj(obj.id);
                                            }}>Delete</Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>{newObj.id === 0 ? `Add New ${bigName}` : `Update ${bigName}`}</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} mt={1}>
                        {params.renderUpdateFields(newObj, (obj) => setNewObj(obj as (ItemType & {id: number})))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreateUpdateObj}>{newObj.id === 0 ? 'Create' : 'Update'}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default ListPage;