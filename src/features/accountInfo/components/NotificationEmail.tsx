import { useEffect, useState } from 'react';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useTranslation } from 'react-i18next';

import color from 'styles/color';
import { useAppSelector, useAppDispatch } from 'common/hooks/hooks';
import { accountSelector, submitNotification } from 'features/accountInfo/AccountSlice';


import { SectionDiv, SectionHeader, CheckBoxContainerDiv, ButtonGroupDiv, SaveButton, CancelButton } from '../styles/accountInfoStyle';



const GreenCheckbox = withStyles({
    root: {
        color: color.GLOBAL.BORDER,
        '&$checked': {
            color: color.THEME,
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);


const NotificationEmail = () => {
    const { t } = useTranslation();

    const accountInfo = useAppSelector(accountSelector);
    const dispatch = useAppDispatch();

    const [isEdit, setEdit] = useState<boolean>(false);

    const [notification, setNotification] = useState({
        rejected: false,
        suspended: false,
        soonEnd: false,
        billed: false
    })

    const [initNotification, setInitNotification] = useState({
        rejected: false,
        suspended: false,
        soonEnd: false,
        billed: false
    })


    const handleChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotification({ ...notification, [event.target.name]: event.target.checked });
        setEdit(true)
    }

    const handleSave = () => {
        let cb = (): void => {
            setInitNotification(notification)
            setEdit(false)
        }
        dispatch(submitNotification({ ...notification, cb }))
    }

    const handleCancel = () => {
        setNotification(initNotification)
        setEdit(false)
    }

    useEffect(() => {
        setNotification(accountInfo.notificationEmail)
        setInitNotification(accountInfo.notificationEmail)
    }, [accountInfo])

    return (
        <SectionDiv>
            <SectionHeader>
                <div>{t('account.notificationEmailSetting')}</div>
            </SectionHeader>
            <CheckBoxContainerDiv>
                <FormControlLabel
                    control={<GreenCheckbox name="rejected" checked={notification.rejected} onChange={handleChnage} />}
                    label={t('account.adRejected')}
                />
                <FormControlLabel
                    control={<GreenCheckbox name="suspended" checked={notification.suspended} onChange={handleChnage} />}
                    label={t('account.accountSuspended')}
                />
                <FormControlLabel
                    control={<GreenCheckbox name="soonEnd" checked={notification.soonEnd} onChange={handleChnage} />}
                    label={t('account.adSoonEnd')}
                />

                <FormControlLabel
                    control={<GreenCheckbox name="billed" checked={notification.billed} onChange={handleChnage} />}
                    label={t('account.balanceBilled')}
                />

                {isEdit ?
                    <ButtonGroupDiv>
                        <SaveButton onClick={handleSave}>{t('account.saveChanges')}</SaveButton>
                        <CancelButton onClick={handleCancel}>{t('account.cancel')}</CancelButton>
                    </ButtonGroupDiv>
                    : null}

            </CheckBoxContainerDiv>

        </SectionDiv>
    )
}

export default NotificationEmail