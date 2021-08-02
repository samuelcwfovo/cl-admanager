import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Root from '../root/Root';
import { useAppDispatch } from 'common/hooks/hooks';
import { fetchAccount } from './AccountSlice';

import BasicInfo from './components/BasicInfo';
import BusinessInfo from './components/BusinessInfo';
import NotificationEmail from './components/NotificationEmail';

import { AccountRoot, MarginDiv } from './styles/accountInfoStyle';


const AccountInfo = () => {

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchAccount());
    }, [])



    return (
        <Root>
            <AccountRoot>
                <h3>{t('account.accountSetting')}</h3>
                <BasicInfo />
                <MarginDiv />
                <BusinessInfo />
                <MarginDiv />
                <NotificationEmail />
            </AccountRoot>
        </Root>
    )
}

export default AccountInfo