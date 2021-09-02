
import { useState } from "react";
import { useTranslation } from 'react-i18next';

import Root from "./Root";
import {
    TapDiv, TapGroupDiv, TapContentDiv, CloseButtonDiv,
    WidgetContainerDiv, WidgetHeaderDiv, CampaignContainerDiv,
    CampaignObjectiveDiv, CampaignIconDiv, CampaignObjectiveDetailDiv,
    CampaignTextDiv, WidgetFooterDiv, ContinueButton
} from "./styles";
import FormInput from "common/components/Form/FormInput";
import RoundedRadioButton from "common/components/Rounded/RoundedRadioButton";

import { CloseOutlined, NotificationsActive, TouchApp, Person } from '@material-ui/icons';

type CampaignObjectDetailProps = {
    icon: JSX.Element;
    title: string;
    description: string;
}

const CampaignObjectDetail = ({ icon, title, description }: CampaignObjectDetailProps) => {

    return (
        <CampaignObjectiveDetailDiv>
            <CampaignIconDiv>
                {icon}
            </CampaignIconDiv>
            <CampaignTextDiv>
                <div>{title}</div>
                <span>{description}</span>
            </CampaignTextDiv>
        </CampaignObjectiveDetailDiv>
    )
}

type CampaignProps = {
    onClose: () => void;
    onNext: () => void;
}

const Campaign = (props: CampaignProps) => {

    const { t } = useTranslation();

    const [tap, setTap] = useState<string>('new');

    const [name, setName] = useState<string>('');
    const [campaignType, setCampaignType] = useState<string>('');
    const [campaignObjective, setCampaignObjective] = useState<string>('');

    const [nameError, setNameError] = useState<boolean>(false);
    const [campaignTypeError, setCampaignTypeError] = useState<boolean>(false);
    const [campaignObjectiveError, setCampaignObjectiveError] = useState<boolean>(false);


    const handleNameChange = (name: string) => {
        setName(name);
        setNameError(false);
    }
    const handleTypeChange = (type: string) => {
        setCampaignType(type);
        setCampaignTypeError(false);
    }

    const handleObjectiveChange = (type: string) => {
        setCampaignObjective(type);
        setCampaignObjectiveError(false);
    }

    const handleCountinue = () => {
        let pass = true;

        if (!campaignType) { setCampaignTypeError(true); pass = false; };
        if (!campaignObjective) { setCampaignObjectiveError(true); pass = false; };
        if (!name) { setNameError(true); pass = false; };


        if (pass) {
            props.onNext()
        }

    }

    return (
        <Root>
            <>
                <TapDiv>
                    <TapGroupDiv>
                        <TapContentDiv isActive={tap === 'new'} onClick={() => setTap('new')}>{t('dashBoard.widget.campaign.new')}</TapContentDiv>
                        <TapContentDiv isActive={tap === 'exist'} onClick={() => setTap('exist')}>{t('dashBoard.widget.campaign.existing')}</TapContentDiv>
                    </TapGroupDiv>
                    <CloseButtonDiv>
                        <CloseOutlined onClick={props.onClose} />
                    </CloseButtonDiv>
                </TapDiv>
                <WidgetContainerDiv>
                    <CampaignContainerDiv>

                        <WidgetHeaderDiv>
                            {t('dashBoard.widget.campaign.name')}
                        </WidgetHeaderDiv>
                        <FormInput onChange={(e) => handleNameChange(e.target.value)} isInvalid={nameError} />

                        <WidgetHeaderDiv>
                            {t('dashBoard.widget.campaign.type')}
                        </WidgetHeaderDiv>
                        <RoundedRadioButton
                            isError={campaignTypeError}
                            checked={campaignType === "external"}
                            onChange={(e) => handleTypeChange("external")}
                        >
                            <div>{t('dashBoard.widget.campaign.external')}</div>
                        </RoundedRadioButton>
                        <RoundedRadioButton
                            isError={campaignTypeError}
                            checked={campaignType === "internal"}
                            onChange={(e) => handleTypeChange("internal")}
                        >
                            <div>{t('dashBoard.widget.campaign.internal')}</div>
                        </RoundedRadioButton>

                        <WidgetHeaderDiv>
                            {t('dashBoard.widget.campaign.objective')}
                        </WidgetHeaderDiv>
                        <CampaignObjectiveDiv>
                            <RoundedRadioButton
                                isError={campaignObjectiveError}
                                checked={campaignObjective === "awareness"}
                                onChange={(e) => handleObjectiveChange("awareness")}
                            >
                                <div>{t('dashBoard.widget.campaign.awareness')}</div>
                            </RoundedRadioButton>
                            <RoundedRadioButton
                                isError={campaignObjectiveError}
                                checked={campaignObjective === "traffic"}
                                onChange={(e) => handleObjectiveChange("traffic")}
                            >
                                <div>{t('dashBoard.widget.campaign.traffic')}</div>
                            </RoundedRadioButton>
                            <RoundedRadioButton
                                isError={campaignObjectiveError}
                                checked={campaignObjective === "engagement"}
                                onChange={(e) => handleObjectiveChange("engagement")}
                            >
                                <div>{t('dashBoard.widget.campaign.engagement')}</div>
                            </RoundedRadioButton>
                        </CampaignObjectiveDiv>


                        {campaignObjective === "awareness" ?

                            <CampaignObjectDetail
                                icon={<NotificationsActive />}
                                title={t('dashBoard.widget.campaign.awareness')}
                                description={t('dashBoard.widget.campaign.awarenessDetail')}
                            />

                            : campaignObjective === "traffic" ?
                                <CampaignObjectDetail
                                    icon={<TouchApp />}
                                    title={t('dashBoard.widget.campaign.traffic')}
                                    description={t('dashBoard.widget.campaign.trafficDetail')}
                                />
                                : campaignObjective === "engagement" ?
                                    <CampaignObjectDetail
                                        icon={<Person />}
                                        title={t('dashBoard.widget.campaign.engagement')}
                                        description={t('dashBoard.widget.campaign.engagementDetail')}
                                    />
                                    : null
                        }
                    </CampaignContainerDiv>
                </WidgetContainerDiv>

                <WidgetFooterDiv>
                    <ContinueButton onClick={handleCountinue}>
                        {t('dashBoard.widget.continue')}
                    </ContinueButton>
                </WidgetFooterDiv>
            </>
        </Root>
    )
}


export default Campaign