
import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';


import Campaign from '../Widget/Campaign';
import AdGroup from '../Widget/AdGroup';
import Ad from '../Widget/Ad';

import useAllCampaign from './useAllCampaign';

import RoundedCheckbox from 'common/components/Rounded/RoundedCheckbox';
import RoundedSwitch from 'common/components/Rounded/RoundedSwitch';

import {
    HeaderDiv, CustomTabsDiv, TabButton, CampaignMenuDiv,
    CreateButton, DropdownButton, CampaignTableDiv,
    IconSpan, CampaignNameWrapper
} from '../../styles';
import {
    FolderSpecialOutlined, DeveloperBoardOutlined,
    AddCircleOutlineOutlined, ArrowDropDownOutlined,
    FolderOutlined
} from '@material-ui/icons';


type CampaignBox = {
    shouldOpen: boolean;
}

const AllCampaign = () => {
    const { t } = useTranslation();
    const [selectedTab, setTab] = useState<number>(0);
    const [rows] = useAllCampaign();
    const [campaignBox, setCampaignBox] = useState<CampaignBox>({ shouldOpen: false });
    const [createTap, setCreateTap] = useState<string>('campaign');

    const handleBoxClose = () => {
        setCampaignBox({ shouldOpen: false })
    }


    const renderCreate = () => {
        if (campaignBox.shouldOpen) {
            if (createTap == 'campaign')
                return <Campaign onClose={handleBoxClose} onNext={setCreateTap('campaign')} />
            if (createTap == 'adGroup')
                return <AdGroup onClose={handleBoxClose} onNext={setCreateTap('adGroup')} />
            if (createTap == 'ad')
                return <Ad onClose={handleBoxClose} onNext={setCreateTap('ad')} />

        }
    }

    return (
        <>
            {renderCreate()}
            <div style={{ paddingBottom: '5rem' }}>
                <HeaderDiv>{t('dashBoard.allCampaign')}</HeaderDiv>
                <CustomTabsDiv>
                    <TabButton onClick={() => setTab(0)} isSelected={selectedTab === 0}>
                        <FolderSpecialOutlined />
                        <div>{t('dashBoard.campaigns')}</div>
                    </TabButton>
                    <TabButton onClick={() => setTab(1)} isSelected={selectedTab === 1}>
                        <DeveloperBoardOutlined />
                        <div>{t('dashBoard.adsSet')}</div>
                    </TabButton>
                    <TabButton onClick={() => setTab(2)} isSelected={selectedTab === 2}>
                        <DeveloperBoardOutlined />
                        <div>{t('dashBoard.ads')}</div>
                    </TabButton>

                </CustomTabsDiv>
                <CampaignMenuDiv>
                    <CreateButton onClick={() => { setCampaignBox({ shouldOpen: true }) }}>
                        <AddCircleOutlineOutlined />
                        <div>Create</div>
                    </CreateButton>
                    <DropdownButton>
                        <div>Performance</div>
                        <ArrowDropDownOutlined />
                    </DropdownButton>
                    <DropdownButton>
                        <div>Breakdowns</div>
                        <ArrowDropDownOutlined />
                    </DropdownButton>
                </CampaignMenuDiv>
                <CampaignTableDiv>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>{t('dashBoard.campaignForm.name')}</th>
                                <th>{t('dashBoard.campaignForm.delivery')}</th>
                                <th>{t('dashBoard.campaignForm.budget')}</th>
                                <th>{t('dashBoard.campaignForm.result')}</th>
                                <th>{t('dashBoard.campaignForm.reach')}</th>
                                <th>{t('dashBoard.campaignForm.impressions')}</th>
                                <th>{t('dashBoard.campaignForm.cost')}</th>
                                <th>{t('dashBoard.campaignForm.amount')}</th>
                                <th>{t('dashBoard.campaignForm.end')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(((row, index) => (
                                <tr id={index.toString()}>
                                    <td><RoundedCheckbox /></td>
                                    <td><RoundedSwitch /></td>
                                    <td>
                                        <CampaignNameWrapper isActive={row.isEnabled}>
                                            <FolderOutlined />
                                            <IconSpan>{row.campaignName}</IconSpan>
                                        </CampaignNameWrapper>
                                    </td>
                                    <td>{row.isEnabled ? 'Active' : 'Off'}</td>
                                    <td>${row.budget}</td>
                                    <td>{row.result.toLocaleString()}</td>
                                    <td>{row.reach.toLocaleString()}</td>
                                    <td>{row.impression.toLocaleString()}</td>
                                    <td>{row.cost.toLocaleString()}</td>
                                    <td>{row.amount.toLocaleString()}</td>
                                    <td>{row.end.toLocaleString()}</td>
                                </tr>
                            )))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}>
                                    <Trans
                                        i18nKey="dashBoard.campaignFoot.result"
                                        count={rows.length}
                                    />
                                </td>
                                <td></td>
                                <td></td>
                                <td>
                                    <span>{t('dashBoard.campaignFoot.reached')}</span>
                                    <p>{rows.reduce((acc, object) => (acc + object.reach), 0).toLocaleString()}</p>
                                </td>
                                <td>
                                    <span>{t('dashBoard.campaignFoot.total')}</span>
                                    <p>{rows.reduce((acc, object) => (acc + object.impression), 0).toLocaleString()}</p>
                                </td>
                                <td>-</td>
                                <td>
                                    <span>{t('dashBoard.campaignFoot.totalSpent')}</span>
                                    <p>{rows.reduce((acc, object) => (acc + object.amount), 0).toLocaleString()}</p>
                                </td>
                                <td>-</td>
                            </tr>
                        </tfoot>
                    </table>
                </CampaignTableDiv>

            </div>
        </>
    )
}


export default AllCampaign