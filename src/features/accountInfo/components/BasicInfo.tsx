import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'common/hooks/hooks';
import { authSelector } from 'features/auth/AuthSlice';
import { ITimezone, ITimezoneOption } from 'react-timezone-select';
import { accountSelector, submitBasicInfo } from 'features/accountInfo/AccountSlice';

import {
    SectionDiv, SectionHeader, SectionDetailDiv,
    SameLineWrapperDiv, UploadButton, RemoveImageDiv, SaveButton, ButtonGroupDiv, CancelButton
} from '../styles/accountInfoStyle';
import FormInput from 'common/components/Form/FormInput';
import TimezoneSelect from 'common/components/Form/TimezoneSelect';


const BasicInfo = () => {
    const { t } = useTranslation();

    const { user } = useAppSelector(authSelector);
    const basicInfo = useAppSelector(accountSelector);
    const dispatch = useAppDispatch();

    const [initLogoUrl, setInitLogoUrl] = useState<string | undefined>(user?.iconUrl);
    const [initAccountName, setInitAccountName] = useState<string>('');
    const [initTimezoneValue, setInitTimezoneValue] = useState<ITimezone>('');

    const [accountName, setAccountName] = useState<string>('');
    const [accountNameError, setAccountNameError] = useState<boolean>(false);
    const onAccountNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(e.target.value, /^(?!\s*$).+/, setAccountName, setAccountNameError);

    const [timezoneLabel, setTimezoneLabel] = useState<string>('');
    const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>('');
    const [timezoneError, setTimezoneError] = useState<boolean>(false);
    const onTimezoneChanged = (timezone: ITimezoneOption) => { setSelectedTimezone(timezone); setTimezoneError(false); };

    const [accountId, setAccountId] = useState<number>();

    const uploadRef = useRef<HTMLInputElement>(null);
    const [logo, setLogo] = useState<File>();
    const onLogoChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList) setLogo(fileList[0]);
        e.target.value = '';
    };
    const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (uploadRef.current) uploadRef.current.click();
    }


    const [isBasicInfoEdit, setBasicInfoEdit] = useState<boolean>(false);


    const stringVerify = (value: string, regx: RegExp, setValue: (value: string) => void, setError: (isError: boolean) => void) => {
        if (regx.test(value)) {
            setValue(value);
            setError(false);
            return true;
        }
        setValue(value);
        setError(true);
    }


    useEffect(() => {
        setAccountName(basicInfo.name)
        setInitAccountName(basicInfo.name)
        setAccountId(basicInfo.id)
        setTimezoneLabel(basicInfo.timezoneLabel)
        setSelectedTimezone(basicInfo.timezoneValue)
        setInitTimezoneValue(basicInfo.timezoneValue)
    }, [basicInfo])


    const handleRemoveImage = () => {
        setLogo(undefined);
        uploadRef.current?.setAttribute('value', '');
    }

    const handleCancel = () => {
        setBasicInfoEdit(false);
        setLogo(undefined);
        setAccountName(initAccountName);
        setSelectedTimezone(initTimezoneValue);
    }

    const handleSave = () => {

        if (accountNameError) return;

        let timezone = (selectedTimezone as ITimezoneOption)

        let cb = () => {
            if (logo) setInitLogoUrl(URL.createObjectURL(logo));
            setLogo(undefined);
            setInitAccountName(accountName);
            if (timezone.label) {
                setTimezoneLabel(timezone.label);
                setInitTimezoneValue(timezone.value);
            }
            setBasicInfoEdit(false);
        }

        dispatch(submitBasicInfo({
            accountName: accountName,
            timezoneLabel: timezone.label,
            timezoneValue: timezone.label,
            timezoneOffset: timezone.offset,
            logo: logo,
            cb: cb
        }))

    }




    return (
        <SectionDiv>
            <SectionHeader>
                <div>{t('account.basicInfo')}</div>
                <span onClick={() => setBasicInfoEdit(true)}>{t('account.edit')}</span>
            </SectionHeader>
            <SectionDetailDiv>
                <div>
                    <div>
                        <h4>{t('account.accountName')}</h4>
                        <div>
                            {isBasicInfoEdit ?
                                <FormInput
                                    isInvalid={accountNameError}
                                    value={accountName}
                                    onChange={onAccountNameChanged}
                                />
                                : <p>{initAccountName}</p>}
                        </div>
                    </div>
                    <div>
                        <h4>{t('account.accountID')}</h4>
                        <div><p>{accountId}</p></div>
                    </div>

                    <div>
                        <h4>{t('account.timezone')}</h4>
                        <div>{isBasicInfoEdit ?
                            <TimezoneSelect
                                value={selectedTimezone}
                                isError={timezoneError}
                                onChange={onTimezoneChanged}
                            />
                            : <p>{timezoneLabel}</p>}</div>
                    </div>

                    <div>
                        <h4>{t('account.currency')}</h4>
                        <div><p>{t('account.dollor')}</p></div>
                    </div>
                </div>
                <div>
                    <h4>{t('account.logo')}</h4>
                    <SameLineWrapperDiv>
                        <img src={logo ? URL.createObjectURL(logo) : initLogoUrl} />
                        <input type='file' hidden ref={uploadRef} onChange={onLogoChanged} />
                        {isBasicInfoEdit ?
                            <>
                                <UploadButton onClick={handleUpload}>{logo ? logo.name : t('account.uploadImage')}</UploadButton>
                                <RemoveImageDiv onClick={handleRemoveImage}>{t('account.removeImage')}</RemoveImageDiv>
                            </>
                            : null
                        }
                    </SameLineWrapperDiv>
                </div>


                {isBasicInfoEdit ?
                    <ButtonGroupDiv>
                        <SaveButton onClick={handleSave}>{t('account.saveChanges')}</SaveButton>
                        <CancelButton onClick={handleCancel}>{t('account.cancel')}</CancelButton>
                    </ButtonGroupDiv>
                    : null}
            </SectionDetailDiv>
        </SectionDiv>

    )
}

export default BasicInfo;

