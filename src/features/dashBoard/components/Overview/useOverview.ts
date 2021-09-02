import { useEffect, useState } from "react"
import api from 'api/request';




const UseOverview = (): [number, (_: any, value: any) => void, number, string[], number[]] => {


    // tabs
    const [tab, setTab] = useState<number>(0);
    const handleTabChange = (_: any, value: any) => {
        setTab(value)
    }


    // spending
    const [spending, setSpending] = useState<number>(0);

    const [labels, setLabels] = useState<string[]>([]);
    const [datas, setDatas] = useState<number[]>([]);

    const fetchData = async () => {
        const result = await api.gets({
            url: 'campaign/overview',
            errorMsg: "Get campaign overview error."
        })

        if (result) {
            setSpending(result.spending)
            setLabels(result.impressions.map((data: any) => data.label))
            setDatas(result.impressions.map((data: any) => data.count))
        }

    }

    useEffect(() => { fetchData() }, [])


    return [tab, handleTabChange, spending, labels, datas]
}


export default UseOverview