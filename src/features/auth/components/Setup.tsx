import React, { useEffect, useRef, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { ITimezone, ITimezoneOption } from 'react-timezone-select';
import { useAppSelector, useAppDispatch } from 'common/hooks/hooks';
import { authSelector, setup, resetErrorMsg } from '../AuthSlice';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";


import logoPath from 'resources/images/carlig_logo.svg';
import AbsoluteTopLeftDiv from './styles/AbsoluteTopLeftDiv';
import HeaderWrapper from './styles/HeaderWrapper';
import CenterDiv from './styles/CenterDiv';
import Form from './styles/Form';
import FormInput from './styles/FormInput';
import TimezoneSelect from './TimezoneSelect';
import RegionSelect from './RegionSelect';
import FormLabel from './styles/FormLabel';
import UploadButton from './styles/UploadButton';
import Button from './styles/Button';
import LinkSpan from './LinkSpan';
import CircularProgress from '@material-ui/core/CircularProgress';

const Setup = () => {
    const { t } = useTranslation();

    // redux
    const dispatch = useAppDispatch();
    const { errorMessage, status, user } = useAppSelector(authSelector);

    let history = useHistory();


    const [accountName, setAccountName] = useState<string>('');
    const [accountNameError, setAccountNameError] = useState<boolean>(false);
    const onAccountNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(e.target.value, /^(?!\s*$).+/, setAccountName, setAccountNameError);

    const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>('');
    const [timezoneError, setTimezoneError] = useState<boolean>(false);
    const onTimezoneChanged = (timezone: ITimezoneOption) => { setSelectedTimezone(timezone); setTimezoneError(false); };

    const [businessName, setBusinessName] = useState<string>('');
    const [businessNameError, setBusinessNameError] = useState<boolean>(false);
    const onBusinessNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(e.target.value, /^(?!\s*$).+/, setBusinessName, setBusinessNameError);

    const [industry, setIndustry] = useState<string>('');
    const [industryError, setIndustryError] = useState<boolean>(false);
    const onIndustryChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(e.target.value, /^(?!\s*$).+/, setIndustry, setIndustryError);

    const [region, setRegion] = useState<string>('');
    const [regionError, setRegionError] = useState<boolean>(false);
    const onRegionChanged = (region: string) => { setRegion(region); setRegionError(false); };

    const uploadRef = useRef<HTMLInputElement>(null);
    const [logo, setLogo] = useState<File>();
    const onLogoChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList) setLogo(fileList[0]);
    };
    const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (uploadRef.current) uploadRef.current.click();
    }

    const [url, setUrl] = useState<string>('');
    const [urlError, setUrlError] = useState<boolean>(false);
    const onUrlChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(
        e.target.value,
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        setUrl, setUrlError);


    const stringVerify = (value: string, regx: RegExp, setValue: (value: string) => void, setError: (isError: boolean) => void) => {
        if (regx.test(value)) {
            setValue(value);
            setError(false);
            return true;
        }

        setError(true);
    }


    const isLoading = status === 'loading';

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!isLoading) {
            let pass = true;
            if (!accountName) { setAccountNameError(true); pass = false };
            if (!selectedTimezone) { setTimezoneError(true); pass = false };
            if (!businessName) { setBusinessNameError(true); pass = false };
            if (!industry) { setIndustryError(true); pass = false };
            if (!region) { setRegionError(true); pass = false };



            if (pass) {
                let timezone = (selectedTimezone as ITimezoneOption)
                console.log(timezone)
                dispatch(setup({
                    accountName,
                    timezoneLabel: timezone.label,
                    timezoneValue: timezone.value,
                    timezoneOffset: timezone.offset as number,
                    businessName,
                    industry,
                    region,
                    logo,
                    url
                }))
            };
        }
    }

    useEffect(()=>{
        if (user === null) history.replace('/auth/login');
    },[])

    useEffect(() => {
        if (user?.status === 'active') history.push('/');
    }, [user?.status])


    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(resetErrorMsg());
        }
    }, [errorMessage])





    return (

        <>
            <AbsoluteTopLeftDiv>
                <HeaderWrapper>
                    <img src={logoPath} />
                    <h3> Ad manager</h3>
                </HeaderWrapper>
            </AbsoluteTopLeftDiv>

            <CenterDiv>
                <div>
                    <h1>{t('setup.title')}</h1>

                    <Form>
                        <FormLabel>{t('setup.accountName')}*</FormLabel>
                        <FormInput isInvalid={accountNameError} onChange={onAccountNameChanged} />

                        <FormLabel>{t('setup.timeZone')}*</FormLabel>
                        <TimezoneSelect
                            onChange={onTimezoneChanged}
                            isError={timezoneError}
                            value={selectedTimezone}
                        />

                        <FormLabel>{t('setup.businessName')}*</FormLabel>
                        <FormInput isInvalid={businessNameError} onChange={onBusinessNameChanged} />

                        <FormLabel>{t('setup.industry')}*</FormLabel>
                        <FormInput isInvalid={industryError} onChange={onIndustryChanged} />

                        <FormLabel>{t('setup.region')}*</FormLabel>
                        <RegionSelect
                            onchange={onRegionChanged}
                            isError={regionError}
                        />

                        <FormLabel>{t('setup.required')}</FormLabel>

                        <FormLabel>{t('setup.logo')}</FormLabel>
                        <input type='file' hidden ref={uploadRef} onChange={onLogoChanged} />
                        <UploadButton
                            onClick={handleUpload}
                        >
                            {logo ? logo.name : t('setup.uploadImage')}
                        </UploadButton>

                        <FormLabel>{t('setup.url')}</FormLabel>
                        <FormInput isInvalid={urlError} onChange={onUrlChanged} />

                        <Button isSetup isLoading={isLoading} onClick={handleSubmit}>
                            {isLoading ? <CircularProgress size={18} /> :
                                t('setup.confirm')
                            }
                        </Button>
                        <div style={{
                            marginTop: '1.5rem',
                            fontSize: '.9rem',
                        }}>
                            <Trans
                                i18nKey="setup.TC"
                                components={{ term: <LinkSpan href="/term" />, privacy: <LinkSpan href="/privacy" />, content: <LinkSpan href="/content" /> }}
                            />
                        </div>

                    </Form>
                </div>

            </CenterDiv>
        </>
    )
}


export default Setup;