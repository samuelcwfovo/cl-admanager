
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";

import {
    SectionDiv, SectionHeader, BalanceWrapperDiv,
    BalanceDiv, DefaultPaymentDiv, MasterImg, VisaImg,
    CreditCardNoDiv, LinkDiv, NoPaymentDiv
} from "../../styles/styles";
import visa from 'resources/images/visa_logo.svg';
import master from 'resources/images/master_logo.svg';

import useOverview from './useOverview';

const Overview = () => {

    let history = useHistory();

    const { t } = useTranslation();
    const [balance, thershold, defaultCard] = useOverview();

    const getCardImg = (type: string) => {
        if (type === 'visa') return <VisaImg src={visa} />
        if (type === 'master') return <MasterImg src={master} />
    }

    return (
        <SectionDiv>
            <SectionHeader>
                <div>{t('payment.overview')}</div>
            </SectionHeader>
            <BalanceWrapperDiv>
                <BalanceDiv>
                    <div>{t('payment.currentBalance')}</div>
                    <div>${balance.toFixed(2)}</div>
                </BalanceDiv>
                <BalanceDiv>
                    <div>{t('payment.thershold')}</div>
                    <div>${thershold.toFixed(2)}</div>
                </BalanceDiv>
            </BalanceWrapperDiv>
            <DefaultPaymentDiv>
                <div>{t('payment.defaultPayment')}</div>
                {defaultCard ?
                    <div>
                        {getCardImg(defaultCard.type)}
                        <CreditCardNoDiv>**** **** **** {defaultCard.lastFourDigit}</CreditCardNoDiv>
                    </div> :
                    <NoPaymentDiv>{t('payment.emptyCardPlaceHolder')}</NoPaymentDiv>
                }

                <LinkDiv onClick={() => history.push('/billing')}>{t('payment.managePayment')}</LinkDiv>
            </DefaultPaymentDiv>
        </SectionDiv>
    )
}

export default Overview;