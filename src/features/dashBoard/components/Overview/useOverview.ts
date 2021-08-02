import { useEffect, useState } from "react"
import api from 'api/request';




const UseOverview = () => {


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
        
    }

    useEffect(()=>{ },[])

}


export default UseOverview