


import Root from '../root/Root';
import Overview from './components/Overview/Overview';
import AllCampaign from './components/AllCampaign/AllCampaign';

const DashBoard = () => {
    return (
        <Root>
            <>
                <Overview />
                <AllCampaign />
            </>
        </Root>
    )
}


export default DashBoard