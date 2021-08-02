

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from 'api/request';

import PaymnetEdit from './PaymentEdit';

import Button from '@material-ui/core/Button';
import {
    SectionDiv, SectionHeader, SectionDetail,
    CardContainerDiv, VisaImg, MasterImg, CardDetailDiv, CardNoDiv,
    CardActiveDiv, CardButtonContainerDiv, LinkSpan
} from '../styles/BillingStyles'
import visa from 'resources/images/visa_logo.svg';
import master from 'resources/images/master_logo.svg';

type CreditCardInfo = {
    id: string;
    type: 'master' | 'visa';
    lastFourDigit: string;
    holderName: string;
    month: string;
    year: string;
    isActive: boolean;
}

type PaymentBox = {
    shouldOpen: boolean;
    cardId?: string;
}

const PaymentMethod = () => {
    const { t } = useTranslation();

    const [cards, setCards] = useState<CreditCardInfo[]>([]);

    const [state, setState] = useState<number>(0);

    const [paymentBox, setPaymentBox] = useState<PaymentBox>({ shouldOpen: false });


    useEffect(() => {
        try {
            api.get(
                'billing/credit-cards'
            ).then(res => {
                if (res.ok) return res.json();
                console.log('get credit-cards bad status code.', res)
            }).then(data => {
                console.log(data)

                let newCards = [] as CreditCardInfo[];
                data.cards.forEach((element: CreditCardInfo) => {
                    newCards.push({
                        id: element.id,
                        type: element.type,
                        lastFourDigit: element.lastFourDigit,
                        holderName: element.holderName,
                        month: element.month,
                        year: element.year,
                        isActive: element.isActive
                    })
                });
                setCards(newCards);
            })
        } catch (e) {
            console.log('get credit-cards error.', e)
        }
    }, [state])

    const handleRemove = (id: string) => {
        try {
            api.delete(
                'billing/credit-card/' + id
            ).then(res => {
                if (res.ok) return res.json();
                console.log('delete credit-card bad status code.', res)
            }).then(data => {
                setState(state + 1)
            })
        } catch (e) {
            console.log('delete credit-card error.', e)
        }
    }

    const handleEdit = (id: string) => {
        setPaymentBox({
            shouldOpen: true,
            cardId: id
        })
    }

    const handleAddCard = () => {
        setPaymentBox({
            shouldOpen: true
        })
    }

    const handleEditClose = () => {
        console.log('close')
        setPaymentBox({ shouldOpen: false })
        setState(state + 1)
    }

    const cardImg = (type: string) => {
        if (type === 'master') return <MasterImg src={master}/>;
        if (type === 'visa') return <VisaImg src={visa}/>;

    }


    return (
        <>
            {paymentBox.shouldOpen ?
                <PaymnetEdit
                    cardId={paymentBox.cardId}
                    onClose={handleEditClose}
                />
                : null}
            <SectionDiv>
                <SectionHeader>
                    <div>{t('bill.paymentMethod')}</div>
                </SectionHeader>
                <SectionDetail>
                    <h5>{t('bill.cardDetail')}</h5>
                    {cards.map(card =>
                        <CardContainerDiv key={card.lastFourDigit}>
                            {cardImg(card.type)}
                            <div>
                                <CardNoDiv>**** **** **** {card.lastFourDigit}</CardNoDiv>
                                <CardDetailDiv>
                                    <div>{card.holderName}</div>
                                    <div>{card.month}/{card.year}</div>
                                </CardDetailDiv>
                            </div>
                            {card.isActive ? <CardActiveDiv>Active</CardActiveDiv> : null}
                            <CardButtonContainerDiv>
                                <Button variant="outlined" onClick={() => handleRemove(card.id)}>{t('bill.remove')}</Button>
                                <Button variant="outlined" onClick={() => handleEdit(card.id)}>{t('bill.modify')}</Button>
                            </CardButtonContainerDiv>
                        </CardContainerDiv>
                    )}

                    <LinkSpan onClick={handleAddCard}>{t('bill.addCard')}</LinkSpan>
                </SectionDetail>
            </SectionDiv>
        </>
    )
}


export default PaymentMethod