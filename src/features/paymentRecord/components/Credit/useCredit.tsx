import { useEffect, useState } from "react"
import api from 'api/request';
import { GridColDef, GridCellParams } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';

import { TableDateDiv } from "../../styles/styles";

type CreditTableData = {
    date: string;
    amount: string;
    type: string;
    remain: string;
}


const useCredit = (): [number, CreditTableData[], GridColDef[]] => {
    const { t } = useTranslation();

    const [credit, setCredit] = useState<number>(0);
    const [tableRow, setRow] = useState<CreditTableData[]>([]);

    const fetchData = async () => {
        const result = await api.gets({
            url: 'payment/credit',
            errorMsg: 'get payment credit error'
        })

        if (result) {
            setCredit(result.credit)
            setRow(result.redemptionHistroy)
        }
    }

    useEffect(() => { fetchData() }, [])

    const columns: GridColDef[] = [
        {
            field: 'date',
            type: 'date',
            width: 350,
            headerName: t('payment.redeemForm.date').toUpperCase(),
            renderCell: (params: GridCellParams) => (
                <TableDateDiv>{(new Date(params.value as string)).toLocaleDateString()}</TableDateDiv>
            )

        },
        {
            field: 'amount',
            type: 'string',
            width: 270,
            headerName: t('payment.redeemForm.amount').toUpperCase(),
            renderCell: (params: GridCellParams) => (
                <>${params.value}</>
            )
        },
        {
            field: 'type',
            type: 'string',
            width: 250,
            headerName: t('payment.redeemForm.type').toUpperCase(),

        },
        {
            field: 'remain',
            type: 'string',
            width: 300,
            headerName: t('payment.redeemForm.remain').toUpperCase(),
            renderCell: (params: GridCellParams) => (
                <>${params.value}</>
            )
        }
    ]


    return [credit, tableRow, columns]
}

export default useCredit