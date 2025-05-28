import {TableCell} from '@mui/material';
import type {Payment} from "../types.ts";
import ListPage from "./ListPage.tsx";
import NavDrawer from "./NavDrawer.tsx";

function PaymentsPage() {
    const now = new Date();
    const dateArrToStr = (dateArr: number[]) => {
        return `${dateArr[0].toString().padStart(4, '0')}-${dateArr[1].toString().padStart(2, '0')}-${dateArr[2].toString().padStart(2, '0')}`;
    }

    return (
        <>
            <NavDrawer/>
            <ListPage
                name="payment"
                apiPath="api/payments"
                allowCreate={false}
                allowUpdate={false}
                allowDelete={false}
                emptyObj={{
                    id: 0,
                    paymentDate: dateArrToStr([now.getFullYear(), now.getMonth()+1, now.getDate()]),
                    paymentMethod: '',
                    policyId: 0,
                }}
                renderTableHead={() => {
                    return (
                        <>
                            <TableCell>Date</TableCell>
                            <TableCell>Method</TableCell>
                            <TableCell>Policy ID</TableCell>
                        </>
                    );
                }}
                renderTableRow={(obj: Payment) => {
                    return (
                        <>
                            <TableCell>{typeof obj.paymentDate === "string" ? obj.paymentDate : dateArrToStr(obj.paymentDate)}</TableCell>
                            <TableCell>{obj.paymentMethod}</TableCell>
                            <TableCell>{obj.policyId}</TableCell>
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

export default PaymentsPage;