

import { useTranslation } from 'react-i18next';
import useCredit from './useCredit';
import {
    TableSectionDiv, SectionHeader, BalanceDiv, RedeemButton
} from "../../styles/styles";
import { DataGrid, GridOverlay } from '@material-ui/data-grid';


const Credit = () => {

    const { t } = useTranslation();

    const [credit, rows, columns] = useCredit()


    return (
        <TableSectionDiv>
            <SectionHeader>
                <div>{t('payment.creditHead')}</div>
            </SectionHeader>
            <BalanceDiv>
                <div>{t('payment.creditBalance')}</div>
                <div>${credit.toFixed(2)}</div>
            </BalanceDiv>
            <RedeemButton>{t('payment.redeemCredits')}</RedeemButton>

            <div style={{ height: '300px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableSelectionOnClick
                    hideFooter
                    components={{
                        NoRowsOverlay: () => (
                            <GridOverlay>
                                <div>{t('payment.noRowOverlay')}</div>
                            </GridOverlay>
                        ),
                    }}

                />
            </div>


        </TableSectionDiv>
    )
}


export default Credit