
import { useTranslation } from 'react-i18next';
import Root from '../root/Root';

import { SectionRoot } from './styles/styles';


import Overview from './components/Overview/Overview';
import Activity from './components/Activity/Activity';
import Credit from './components/Credit/Credit';

const PaymentRecordPage = () => {

    const { t } = useTranslation();


    return (
        <Root>
            <SectionRoot>
                <h3>{t('payment.payment')}</h3>

                <Overview />
                <Activity />
                <Credit />
            </SectionRoot>
        </Root>
    )
}

export default PaymentRecordPage