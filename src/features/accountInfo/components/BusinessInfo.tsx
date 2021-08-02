import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'common/hooks/hooks';
import { accountSelector, submitBusinessInfo } from 'features/accountInfo/AccountSlice';


import {
    SectionDiv, SectionHeader, SectionDetailDiv,
    SaveButton, ButtonGroupDiv, CancelButton
} from '../styles/accountInfoStyle';
import FormInput from 'common/components/Form/FormInput';





const BusinessInfo = () => {
    const { t } = useTranslation();

    const businessInfo = useAppSelector(accountSelector);
    const dispatch = useAppDispatch();

    // init value
    const [initBusinessName, setInitBusinessName] = useState<string>('');
    const [initIndustry, setInitIndustry] = useState<string>('');
    const [initRegion, setInitRegion] = useState<string>('');
    const [initUrl, setInitUrl] = useState<string>('');


    const [businessName, setBusinessName] = useState<string>('');
    const [businessNameError, setBusinessNameError] = useState<boolean>(false);
    const onBusinessNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(e.target.value, /^(?!\s*$).+/, setBusinessName, setBusinessNameError);

    const [industry, setIndustry] = useState<string>('');
    const [industryError, setIndustryError] = useState<boolean>(false);
    const onIndustryChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(e.target.value, /^(?!\s*$).+/, setIndustry, setIndustryError);

    const [region, setRegion] = useState<string>('');
    const [regionError, setRegionError] = useState<boolean>(false);
    const onRegionChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(e.target.value, /^(?!\s*$).+/, setRegion, setRegionError);

    const [url, setUrl] = useState<string>('');
    const [urlError, setUrlError] = useState<boolean>(false);
    const onUrlChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(e.target.value, /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, setUrl, setUrlError);


    const [isBusinessInfoEdit, setBusinessInfoEdit] = useState<boolean>(false);

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
        setInitBusinessName(businessInfo.businessName);
        setBusinessName(businessInfo.businessName);

        setInitIndustry(businessInfo.industry);
        setIndustry(businessInfo.industry);

        setInitRegion(businessInfo.region);
        setRegion(businessInfo.region);

        setInitUrl(businessInfo.url);
        setUrl(businessInfo.url);



    }, [businessInfo])



    const handleCancel = () => {
        setBusinessInfoEdit(false);
        setBusinessName(initBusinessName);
        setIndustry(initIndustry);
        setRegion(initRegion);
        setUrl(initUrl);
    }

    const handleSave = () => {
        // every will stop if false detected.
        if (![businessNameError, industryError, regionError, urlError].every(x => !x)) return;

        let cb = () => {
            setBusinessInfoEdit(false);
            setInitBusinessName(businessName);
            setInitIndustry(industry);
            setInitRegion(region);
            setUrl(url)
        }

        dispatch(submitBusinessInfo({
            businessName: businessName,
            industry: industry,
            region: region,
            url: url,
            cb: cb
        }))
    }


    return (
        <SectionDiv>
            <SectionHeader>
                <div>{t('account.businessInfo')}</div>
                <span onClick={() => setBusinessInfoEdit(true)}>{t('account.edit')}</span>
            </SectionHeader>
            <SectionDetailDiv>
                <div>
                    <div>
                        <h4>{t('account.businessName')}</h4>
                        <div>
                            {isBusinessInfoEdit ?
                                <FormInput
                                    isInvalid={businessNameError}
                                    value={businessName}
                                    onChange={onBusinessNameChanged}
                                />
                                : <p>{initBusinessName}</p>}
                        </div>
                    </div>
                    <div>
                        <h4>{t('account.industry')}</h4>
                        <div>
                            {isBusinessInfoEdit ?
                                <FormInput
                                    isInvalid={industryError}
                                    value={industry}
                                    onChange={onIndustryChanged}
                                />
                                : <p>{initIndustry}</p>}
                        </div>
                    </div>
                    <div>
                        <h4>{t('account.region')}</h4>
                        <div>
                            {isBusinessInfoEdit ?
                                <FormInput
                                    isInvalid={regionError}
                                    value={region}
                                    onChange={onRegionChanged}
                                />
                                : <p>{initRegion}</p>}
                        </div>
                    </div>
                    <div>
                        <h4>{t('account.url')}</h4>
                        <div>
                            {isBusinessInfoEdit ?
                                <FormInput
                                    isInvalid={urlError}
                                    value={url}
                                    onChange={onUrlChanged}
                                />
                                : <p>{initUrl}</p>}
                        </div>
                    </div>
                </div>

                {isBusinessInfoEdit ?
                    <ButtonGroupDiv>
                        <SaveButton onClick={handleSave}>{t('account.saveChanges')}</SaveButton>
                        <CancelButton onClick={handleCancel}>{t('account.cancel')}</CancelButton>
                    </ButtonGroupDiv>
                    : null}
            </SectionDetailDiv>
        </SectionDiv>
    )
}

export default BusinessInfo