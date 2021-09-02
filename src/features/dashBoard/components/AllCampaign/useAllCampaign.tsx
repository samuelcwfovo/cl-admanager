import { useEffect, useState } from "react";
import api from 'api/request';




type CampaignData = {
    campaignName: string;
    isEnabled: boolean;
    budget: number;
    result: number;
    reach: number;
    impression: number;
    cost: number;
    amount: number;
    end: number;
}



const useAllCampaign = (): [CampaignData[]] => {
    const [rows, setRows] = useState<CampaignData[]>([]);

    const fetchData = async () => {
        const result = await api.gets({
            url: 'campaign/all',
            errorMsg: 'Get campaign data error.'
        })

        if (result) {
            setRows(result.campaigns)
        }
    }

    useEffect(() => { fetchData() }, [])




    return [rows]
}

export default useAllCampaign;