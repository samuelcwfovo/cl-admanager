import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


import api from 'api/request';

import CircularProgress from '@material-ui/core/CircularProgress';

import {
    DrakBgFilterDiv, AbsoluteCenterDiv, SectionDiv, SectionHeader, SectionDetail,
    SameLineWrapperDiv, ButtonGroupDiv, SaveButton, CancelButton, CheckBox
} from '../styles/BillingStyles'
import FormInput from 'common/components/Form/FormInput';


interface Props {
    cardId?: string;
    onClose: () => void;
}

const PaymnetEdit = (props: Props) => {

    const { t } = useTranslation();

    const [isLoading, setLoading] = useState<boolean>(false);

    const [cardNo, setCardNo] = useState<string>('');
    const [cardError, setCardError] = useState<boolean>(false);
    const onCardChanged = (e: React.ChangeEvent<HTMLInputElement>) => {

        let value = e.target.value.replaceAll(' ', '');

        // lest than 16 digit
        if (/^[0-9]{0,16}$/.test(value)) {
            // handle space between
            let finialstr = ''
            let tempValue = value;
            while (tempValue.length > 4) {
                let str = tempValue.substring(0, 4)
                finialstr = finialstr.concat(str + " ")
                tempValue = tempValue.substring(4)
            }
            finialstr = finialstr.concat(tempValue)
            setCardNo(finialstr);

            (/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/).test(value) ? setCardError(false) : setCardError(true);
        }

    };

    const [holder, setHolder] = useState<string>('');
    const [holderError, setHolderError] = useState<boolean>(false);
    const onHolderChanged = (e: React.ChangeEvent<HTMLInputElement>) => stringVerify(e.target.value, /^(?!\s*$).+/, setHolder, setHolderError);

    const stringVerify = (value: string, regx: RegExp, setValue: (value: string) => void, setError: (isError: boolean) => void) => {
        if (regx.test(value)) {
            setValue(value);
            setError(false);
            return true;
        }
        setValue(value);
        setError(true);
    }

    const [month, setMonth] = useState<string>('');
    const [monthError, setMonthError] = useState<boolean>(false);
    const onMonthChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value);
        if (value && value > 0 && value < 13) {
            setMonth(value.toString());
            setMonthError(false);
        }

        if (e.target.value == '') {
            setMonth(e.target.value);
        }
    }

    const [year, setYear] = useState<string>('');
    const [yearError, setYearError] = useState<boolean>(false);
    const onYearChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value);
        if (value && value > 0 && value < 99) {
            setYear(value.toString());
            setYearError(false);
        }

        if (e.target.value == '') {
            setYear(e.target.value);
        }
    }

    const [cvv, setCvv] = useState<string>('');
    const [cvvError, setCvvError] = useState<boolean>(false);
    const onCvvChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (/^[0-9]{0,3}$/.test(value)) {
            setCvv(value.toString());
            /^[0-9]{3}$/.test(value) ? setCvvError(false) : setCvvError(true);
        }
    }

    const [isPrimary, setPrimary] = useState<boolean>(false);


    const handleSubmit = () => {
        let pass = true;

        if (!cardNo) { setCardError(true); pass = false };
        if (!holder) { setHolderError(true); pass = false };
        if (!month) { setMonthError(true); pass = false };
        if (!year) { setYearError(true); pass = false };
        if (!cvv) { setCvvError(true); pass = false };
        let validInput = [cardError, holderError, monthError, yearError, cvvError].every(x => !x);
        if (!pass || !validInput) return;


        setLoading(true);

        try {
            api.post(
                'billing/credit-card',
                JSON.stringify({
                    number: cardNo,
                    holder: holder,
                    month: month,
                    year: year,
                    cvv: cvv,
                    isPrimary: isPrimary
                })
            ).then(res => {
                setLoading(false);
                if (res.ok) return res.json();
                console.log('post credit bad status code.', res)
            }).then(data => {
                props.onClose()
            })

        } catch (e) {
            console.log('post credit card error.', e)
        }

    }


    const handleCancel = () => {
        props.onClose()
    }


    return (
        <>
            <DrakBgFilterDiv>
                <AbsoluteCenterDiv>
                    <SectionDiv>
                        <SectionHeader>
                            <div>{props.cardId ? t('bill.modifyHeader') : t('bill.newCardHeader')}</div>
                        </SectionHeader>
                        <SectionDetail>
                            <SameLineWrapperDiv>
                                <div>
                                    <h4>{t('bill.cardNo')}</h4>
                                    <FormInput
                                        style={{ width: '28rem', marginRight: '3rem' }}
                                        value={cardNo}
                                        isInvalid={cardError}
                                        onChange={onCardChanged}
                                        placeholder='0000 0000 0000 0000'
                                    />
                                </div>
                                <div>
                                    <h4>{t('bill.cardHolder')}</h4>
                                    <FormInput
                                        style={{ width: '23rem' }}
                                        value={holder}
                                        isInvalid={holderError}
                                        onChange={onHolderChanged}
                                        placeholder={t('bill.placeHolder.cardHolder')}
                                    />
                                </div>
                            </SameLineWrapperDiv>
                            <SameLineWrapperDiv>
                                <div>
                                    <h4>{t('bill.expiryDate')}</h4>
                                    <SameLineWrapperDiv>
                                        <FormInput
                                            style={{ width: '4rem' }}
                                            value={month}
                                            isInvalid={monthError}
                                            onChange={onMonthChanged}
                                            placeholder={t('bill.placeHolder.MM')}
                                        />
                                        <div style={{ padding: "0 .5rem" }}>/</div>
                                        <FormInput
                                            style={{ width: '4rem', marginRight: '3rem' }}
                                            value={year}
                                            isInvalid={yearError}
                                            onChange={onYearChanged}
                                            placeholder={t('bill.placeHolder.YY')}
                                        />
                                    </SameLineWrapperDiv>
                                </div>
                                <div>
                                    <h4>{t('bill.cvv')}</h4>
                                    <FormInput
                                        type="password"
                                        style={{ width: '28rem' }}
                                        value={cvv}
                                        isInvalid={cvvError}
                                        onChange={onCvvChanged}
                                        placeholder={t('bill.placeHolder.cvv')}
                                    />
                                </div>
                            </SameLineWrapperDiv>

                            <CheckBox
                                label={t('bill.primaryPayment')}
                                checked={isPrimary}
                                onChange={(_, checked) => setPrimary(checked)}
                            />

                            <ButtonGroupDiv>
                                <SaveButton onClick={handleSubmit}>
                                    {isLoading ? <CircularProgress size={18} />
                                        : t('bill.confirm')
                                    }
                                </SaveButton>
                                <CancelButton onClick={handleCancel}>{t('bill.cancel')}</CancelButton>
                            </ButtonGroupDiv>
                        </SectionDetail>
                    </SectionDiv>
                </AbsoluteCenterDiv>
            </DrakBgFilterDiv>
        </>
    )
}


export default PaymnetEdit