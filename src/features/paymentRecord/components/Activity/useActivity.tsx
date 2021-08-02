import { useState, useEffect, Dispatch, SetStateAction } from "react";
import api from 'api/request';
import { GridColDef, GridCellParams } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';

import {
    TableDateDiv, TableCardNoDiv, TableStatusDiv, LinkDiv
} from "../../styles/styles";

type TransactionData = {
    date: string;
    id: string;
    amount: string;
    type: string;
    cardNo: string;
    status: string;
    receipt: string;
}


const useActivity = (): [Date, Dispatch<SetStateAction<Date>>, Date, Dispatch<SetStateAction<Date>>, TransactionData[], GridColDef[]] => {
    const { t } = useTranslation();

    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [tableRow, setRow] = useState<TransactionData[]>([]);

    const fetchData = async () => {
        const result = await api.gets({
            url: `payment/transaction/${startDate.getTime()}/${endDate.getTime()}`,
            errorMsg: 'Get transaction activity error',
        })

        if (result) {
            console.log(result)
            setRow(result.transaction)
        }
    }

    useEffect(() => { fetchData() }, [startDate, endDate])


    const columns: GridColDef[] = [
        {
            field: 'date',
            type: 'date',
            width: 180,
            headerName: t('payment.transactionForm.date'),
            headerClassName: 'customTableHeader',
            renderCell: (params: GridCellParams) => (
                <TableDateDiv>{(new Date(params.value as string)).toLocaleDateString()}</TableDateDiv>
            )
        },
        {
            field: 'billId',
            type: 'string',
            width: 150,
            headerName: t('payment.transactionForm.id'),
        },
        {
            field: 'amount',
            width: 140,
            headerName: t('payment.transactionForm.amount'),
            renderCell: (params: GridCellParams) => (
                <>${params.value}</>
            )
        },
        {
            field: 'billType',
            width: 180,
            headerName: t('payment.transactionForm.type'),
        },
        {
            field: 'paymentMethod',
            width: 220,
            headerName: t('payment.transactionForm.paymentMethod'),
            renderCell: (params: GridCellParams) => (
                <TableCardNoDiv>**** **** **** {params.value}</TableCardNoDiv>
            )
        },
        {
            field: 'status',
            width: 160,
            headerName: t('payment.transactionForm.status'),
            renderCell: (params: GridCellParams) => (
                <TableStatusDiv status={params.value as string}>
                    {params.value}
                </TableStatusDiv>
            )
        },
        {
            field: 'receipt',
            width: 150,
            headerName: t('payment.transactionForm.receipt'),
            renderCell: (params: GridCellParams) => (
                <LinkDiv onClick={() => { window.open(params.value as string) }}>Download</LinkDiv>
            )
        }
    ]


    return [startDate, setStartDate, endDate, setEndDate, tableRow, columns]
}

export default useActivity