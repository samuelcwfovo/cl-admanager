import { useTranslation } from 'react-i18next';
import DatePicker from "react-datepicker";
import { DataGrid, GridOverlay } from '@material-ui/data-grid';

import "react-datepicker/dist/react-datepicker.css";

import {
    TableSectionDiv, SectionHeader, DateDiv, DateWrapperDiv
} from "../../styles/styles";
import DateRangeIcon from '@material-ui/icons/DateRange';


import useActivity from './useActivity';

const Activity = () => {

    const { t } = useTranslation();

    const [startDate, setStartDate, endDate, setEndDate, rows, columns] = useActivity();


    return (
        <TableSectionDiv>
            <SectionHeader>
                <div>{t('payment.transaction')}</div>
            </SectionHeader>
            <DateDiv>
                <span>{t('payment.from')}</span>
                <DateWrapperDiv>
                    <div><DateRangeIcon /></div>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => { setStartDate(date) }}
                        maxDate={new Date()}
                    />
                </DateWrapperDiv>
                <span>{t('payment.to')}</span>
                <DateWrapperDiv>
                    <div><DateRangeIcon /></div>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date) => { setEndDate(date) }}
                        maxDate={new Date()}
                    />
                </DateWrapperDiv>
            </DateDiv>
            <div style={{ height: '300px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    disableSelectionOnClick
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


export default Activity