
import React from 'react';
import { Line } from 'react-chartjs-2';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslation } from 'react-i18next';

import { HeaderDiv, TabsDiv, ChartDiv } from '../../styles';
import UseOverview from './useOverview';


type ChartProps = {
    labels: string[];
    datas: number[];
}

const Chart: React.FC<ChartProps> = React.memo(({ labels, datas }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of impression',
                data: datas,
                fill: false,
                backgroundColor: '#38D1B3',
                borderColor: '#9CE8D9',
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        }
    };
    return (
        <ChartDiv>
            <Line
                data={data}
                options={options}
            />
        </ChartDiv>
    )
})

const Overview = () => {

    const { t } = useTranslation();

    const [tab, handleTabChange, spending, labels, datas] = UseOverview();

    return (
        <div>
            <HeaderDiv>{t('dashBoard.overview')}</HeaderDiv>
            <TabsDiv>
                <Tabs
                    value={tab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    onChange={handleTabChange}
                >
                    <Tab label={t('dashBoard.impression')} />
                    <Tab label={t('dashBoard.clicks')} />
                </Tabs>
                <span>{t('dashBoard.spending')} ${spending.toFixed(2)}</span>
            </TabsDiv>
            <Chart labels={labels} datas={datas} />
        </div>
    )
}


export default Overview