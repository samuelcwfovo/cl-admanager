import { useEffect, useState } from "react"
import api from 'api/request';

type DefaultCard = {
    type: string;
    lastFourDigit: string;
}

const useOverview = (): [number, number, DefaultCard | undefined] => {
    const [balance, setBalance] = useState<number>(0);
    const [thershold, setThershold] = useState<number>(0);

    const [defaultCard, setDefaultCard] = useState<DefaultCard>();

    const fetchData = async () => {
        const result = await api.gets({
            url: 'payment/overview',
            errorMsg: 'Get account overview Error.'
        })

        if (result) {
            setBalance(result.balance);
            setThershold(result.thershold)
            if (result.defaultCard)
                setDefaultCard({
                    type: result.defaultCard.type,
                    lastFourDigit: result.defaultCard.lastFourDigit
                })
        }
    }
    useEffect(() => {
        fetchData()
    },[])

    return [balance, thershold, defaultCard]
}

export default useOverview;