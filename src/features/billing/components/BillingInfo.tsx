

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import api from 'api/request';


import {
    SectionDiv, SectionHeader, SectionDetail, SectionDetailGrid, SameLineWrapperDiv
    , ButtonGroupDiv, SaveButton, CancelButton, PhoneInputWrapper
} from '../styles/BillingStyles'
import color from 'styles/color';
import FormInput from 'common/components/Form/FormInput';
import CircularProgress from '@material-ui/core/CircularProgress';


const BillingInfo = () => {
    const { t } = useTranslation();

    const [isEdit, setEdit] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const [initName, setInitName] = useState<string>('--');
    const [initAddress, setInitAddress] = useState<string>('--');
    const [initPhone, setInitPhone] = useState<string>('--');
    const [initEmail, setInitEmail] = useState<string>('--');

    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<boolean>(false);
    const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(e.target.value, /^(?!\s*$).+/, setName, setNameError);


    const [address, setAddress] = useState<string>('');
    const [addressError, setAddressError] = useState<boolean>(false);
    const onAddressChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(e.target.value, /^(?!\s*$).+/, setAddress, setAddressError);

    const [phone, setPhone] = useState<string>('');
    const [phoneError, setPhoneError] = useState<boolean>(false);
    const onPhoneChgange = (value: string) => {
        // contry code 3 + min 1 phone
        value.length < 5 ? setPhoneError(true) : setPhoneError(false);
        setPhone(value);
    }

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(e.target.value, /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, setEmail, setEmailError);


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
        try {
            api.get('billing/info')
                .then(res => {
                    if (res.ok) return res.json();
                    console.log('get billing info bad status code.', res)
                }).then(data => {
                    setInitName(data.name);
                    setName(data.name);

                    setInitAddress(data.address);
                    setAddress(data.address);

                    setInitPhone(data.phone);
                    setPhone(data.phone);

                    setInitEmail(data.email);
                    setEmail(data.email);
                })
        } catch (e) {
            console.log('get billing info error.', e)
        }

    }, [])

    const handleSave = () => {
        let pass = true;
        if (!name) { setNameError(true); pass = false; };
        if (!address) { setAddressError(true); pass = false; };
        if (!phone) { setPhoneError(true); pass = false; };
        if (!email) { setEmailError(true); pass = false; };
        let validInput = [nameError, addressError, phoneError, emailError].every(x => !x);
        if (!pass || !validInput) return;

        setLoading(true);

        try {
            api.post(
                'billing/info',
                JSON.stringify({
                    name: name,
                    address: address,
                    phone: phone,
                    email: email
                })
            ).then(res => {
                setLoading(false);
                if (res.ok) return res.json();
                console.log('post billingInfo bad status code.', res)
            }).then(data => {
                setEdit(false)

                setInitName(name)
                setInitAddress(address)
                setInitPhone(phone)
                setInitEmail(email)


            })
        } catch (e) {
            console.log('post billingInfo error.', e)
        }
    }

    const handleCancel = () => {
        setEdit(false)
    }

    return (
        <SectionDiv>
            <SectionHeader>
                <div>{t('bill.billingInfo')}</div>
                <span onClick={() => setEdit(true)}>{t('bill.edit')}</span>
            </SectionHeader>

            <SectionDetail>
                <SectionDetailGrid>
                    <div>
                        <h4>{t('bill.name')}</h4>
                        <div>
                            {isEdit ?
                                <FormInput
                                    isInvalid={nameError}
                                    value={name}
                                    onChange={onNameChanged}
                                />
                                : <p>{initName}</p>
                            }
                        </div>
                    </div>

                    <div>
                        <h4>{t('bill.address')}</h4>
                        <div>
                            {isEdit ?
                                <FormInput
                                    isInvalid={addressError}
                                    value={address}
                                    onChange={onAddressChanged}
                                />
                                : <p>{initAddress}</p>
                            }
                        </div>
                    </div>

                    <div>
                        <h4>{t('bill.phone')}</h4>
                        <div>
                            {isEdit ?
                                <PhoneInputWrapper>
                                    <PhoneInput
                                        country={'hk'}
                                        value={phone}
                                        placeholder={''}
                                        onChange={onPhoneChgange}
                                        inputStyle={{
                                            boxSizing: 'border-box',
                                            width: '100%',
                                            padding: '.6rem 1rem .6rem calc(1rem + 48px)',
                                            borderRadius: '5px',
                                            border: phoneError ? `1px solid ${color.FORM.BORDER.ERROR}` : `1px solid ${color.FORM.BORDER.NORMAL}`,
                                            backgroundColor: phoneError ? color.FORM.BG.ERROR : color.FORM.BG.NORMAL,
                                            fontFamily: "'Lato',sans-serif",
                                            fontWeight: 'normal',
                                            height: 'auto'
                                        }}
                                        buttonStyle={{
                                            margin: '3px',
                                            borderTop: 'none',
                                            borderLeft: 'none',
                                            borderBottom: 'none',
                                            background: 'transparent',
                                        }}
                                        dropdownStyle={{
                                            width: '24.2rem'
                                        }}
                                    />
                                </PhoneInputWrapper>
                                : <p>{initPhone}</p>
                            }
                        </div>
                    </div>

                    <div>
                        <h4>{t('bill.email')}</h4>
                        <div>
                            {isEdit ?
                                <FormInput
                                    isInvalid={emailError}
                                    value={email}
                                    onChange={onEmailChanged}
                                />
                                : <p>{initEmail}</p>
                            }
                        </div>
                    </div>
                </SectionDetailGrid>
                {isEdit ?
                    <ButtonGroupDiv>
                        <SaveButton onClick={handleSave}>
                            {isLoading ? <CircularProgress size={18} />
                                : t('bill.confirm')
                            }
                        </SaveButton>
                        <CancelButton onClick={handleCancel}>{t('bill.cancel')}</CancelButton>

                    </ButtonGroupDiv>
                    : null}

            </SectionDetail>
        </SectionDiv>
    )

}




export default BillingInfo