

import Root from '../root/Root';
import { BillingRoot } from "./styles/BillingStyles"
import { useTranslation } from 'react-i18next';

import PaymentMethod from './components/PaymentMethod';
import BillingInfo from './components/BillingInfo';

const BillingPage = () => {

    const { t } = useTranslation();


    return (
        <Root>
            <BillingRoot>
                <h3>{t('bill.setting')}</h3>
                <PaymentMethod />

                <BillingInfo />
            </BillingRoot>

        </Root >
    )
}


export default BillingPage