import { useState } from "react";
import { useTranslation } from 'react-i18next';
import DatePicker from "react-datepicker";
import Select from 'react-select';


import SearchAdSrc from "resources/images/ad_search.svg";
import DisplayAdSrc from "resources/images/ad_display.svg";

import FormInput from "common/components/Form/FormInput";
import Root from "./Root";
import {
    TapDiv, TapGroupDiv, TapContentDiv, CloseButtonDiv,
    WidgetContainerDiv, AdGroupContainerDiv, WidgetHeaderDiv,
    CheckBoxWrapperDiv, DatePickWrapperDiv, TapSelectDiv,
    AdvanceWrapperDiv, TimePickWrapperDiv, DeviceTypeDiv,
    BudgetTypeDiv, AmountWrapperDiv, FormatWrapperDiv, WidgetFooterDiv,
    ContinueButton, PreviousButton, ButtonGroupDiv
} from "./styles";
import { CloseOutlined, ArrowDropDown, ArrowDropUp, ArrowBack } from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RoundedRadioButton from "common/components/Rounded/RoundedRadioButton";


type AdGroupProps = {
    onClose: () => void;
}

const AdGroup = (props: AdGroupProps) => {
    const { t } = useTranslation();

    const [tap, setTap] = useState<string>('new');
    const [startDate, setStartDate] = useState(new Date());
    const [enableEndDate, setEnableEndDate] = useState<boolean>(false);
    const [endDate, setEndDate] = useState(new Date());
    const [enableAdvance, setEnableAdvance] = useState<boolean>(false);

    const [enableTimes, setEnableTimes] = useState(
        ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].reduce((previousValue, day) => {
            return {
                ...previousValue,
                [day]: {
                    startTime: new Date('Jan 1, 1970'),
                    endTIme: new Date('Jan 1, 1970 23:59:00')
                }
            }
        }, {})
    );

    const [deviceType, setDeviceType] = useState({
        desktop: false,
        portable: false
    });

    const [budgetType, setBudgetType] = useState<string>('');
    const [budgetTypeError, setBudgetTypeError] = useState<boolean>(false);
    const handleBudgetTypeChange = (type: string) => {
        setBudgetType(type)
        setBudgetTypeError(false)
    }

    const [formatType, setFormatType] = useState<string>('');
    const [formatTypeError, setFormatTypeError] = useState<boolean>(false);
    const handleFormatTypeChange = (type: string) => {
        setFormatType(type);
        setFormatTypeError(false);
    }

    const handleCountinue = () => {

    }

    return (
        <Root>
            <>
                <TapDiv>
                    <TapGroupDiv>
                        <TapContentDiv isActive={tap === 'new'} onClick={() => setTap('new')}>{t('dashBoard.widget.adGroup.new')}</TapContentDiv>
                        <TapContentDiv isActive={tap === 'exist'} onClick={() => setTap('exist')}>{t('dashBoard.widget.adGroup.existing')}</TapContentDiv>
                    </TapGroupDiv>
                    <CloseButtonDiv>
                        <CloseOutlined onClick={props.onClose} />
                    </CloseButtonDiv>
                </TapDiv>
                <WidgetContainerDiv>
                    <AdGroupContainerDiv>
                        <div>
                            <WidgetHeaderDiv>
                                Ad Group Name
                            </WidgetHeaderDiv>
                            <FormInput isInvalid={false} />

                            <WidgetHeaderDiv>
                                Period
                            </WidgetHeaderDiv>

                            <DatePickWrapperDiv>
                                <div>Start date</div>
                                <DatePicker
                                    selected={startDate}
                                    showTimeSelect
                                    onChange={(date: Date) => { setStartDate(date) }}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                />
                            </DatePickWrapperDiv>

                            {enableEndDate ?
                                <DatePickWrapperDiv>
                                    <div>End date</div>
                                    <DatePicker
                                        selected={endDate}
                                        showTimeSelect
                                        onChange={(date: Date) => { setEndDate(date) }}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />
                                </DatePickWrapperDiv>
                                : null
                            }

                            <CheckBoxWrapperDiv>
                                <FormControlLabel
                                    control={<Checkbox checked={enableEndDate} onChange={(e) => setEnableEndDate(e.target.checked)} />}
                                    label={'Set end date'}
                                />
                            </CheckBoxWrapperDiv>

                            <AdvanceWrapperDiv onClick={() => setEnableAdvance(!enableAdvance)}>
                                Advance
                                {enableAdvance ?
                                    <ArrowDropDown />
                                    :
                                    <ArrowDropUp />

                                }
                            </AdvanceWrapperDiv>


                            {enableAdvance ?
                                Object.entries(enableTimes).map(([key, value]: [string, any]) => {
                                    console.log(key, value)

                                    return (
                                        <TimePickWrapperDiv>
                                            <div>{key}</div>
                                            <div>
                                                <div>
                                                    <DatePicker
                                                        selected={value.startTime}
                                                        onChange={(date: Date) => {
                                                            setEnableTimes({
                                                                ...enableTimes,
                                                                [key]: {
                                                                    startTime: date,
                                                                    endTIme: value.endTIme
                                                                }

                                                            })
                                                        }}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={15}
                                                        timeCaption="Time"
                                                        dateFormat="h:mm aa"
                                                    />

                                                </div>
                                                <span>to</span>
                                                <div>
                                                    <DatePicker
                                                        selected={value.endTIme}
                                                        onChange={(date: Date) => {
                                                            setEnableTimes({
                                                                ...enableTimes,
                                                                [key]: {
                                                                    startTime: value.startTime,
                                                                    endTIme: date
                                                                }

                                                            })
                                                        }}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={15}
                                                        timeCaption="Time"
                                                        dateFormat="h:mm aa"
                                                    />
                                                </div>
                                            </div>
                                        </TimePickWrapperDiv>
                                    )
                                })
                                : null
                            }

                            <WidgetHeaderDiv>
                                Device Type
                            </WidgetHeaderDiv>

                            <DeviceTypeDiv>
                                <CheckBoxWrapperDiv>
                                    <FormControlLabel
                                        control={<Checkbox checked={deviceType.desktop} onChange={(e) =>
                                            setDeviceType({ ...deviceType, ['desktop']: e.target.checked })
                                        } />}
                                        label={'Desktop'}
                                    />
                                </CheckBoxWrapperDiv>
                                <CheckBoxWrapperDiv>
                                    <FormControlLabel
                                        control={<Checkbox checked={deviceType.portable} onChange={(e) =>
                                            setDeviceType({ ...deviceType, ['portable']: e.target.checked })
                                        } />}
                                        label={'Mobile + Tablet'}
                                    />
                                </CheckBoxWrapperDiv>

                            </DeviceTypeDiv>

                            <WidgetHeaderDiv>
                                Country
                            </WidgetHeaderDiv>

                            <TapSelectDiv>
                                <Select
                                    classNamePrefix="Tap"
                                    isMulti
                                    options={[
                                        { value: 'hongkong', label: 'Hong Kong' },
                                        { value: 'taiwan', label: 'Taiwan' },
                                        { value: 'macau', label: "Macau" }
                                    ]}
                                />
                            </TapSelectDiv>

                            <WidgetHeaderDiv>
                                Targeting
                            </WidgetHeaderDiv>

                            <TapSelectDiv>
                                <Select
                                    classNamePrefix="Tap"
                                    isMulti
                                    options={[
                                        { value: 'beauty', label: 'Beauty' },
                                    ]}
                                />
                            </TapSelectDiv>

                        </div>

                        <div>
                            <WidgetHeaderDiv>
                                Budget
                            </WidgetHeaderDiv>
                            <p>The default buying type is auction buying. Our system will set bids automatically based on your campaign objective</p>

                            <WidgetHeaderDiv>
                                Budget Type
                            </WidgetHeaderDiv>

                            <BudgetTypeDiv>
                                <RoundedRadioButton
                                    isError={budgetTypeError}
                                    checked={budgetType === "all"}
                                    onChange={(e) => handleBudgetTypeChange("all")}
                                >
                                    <div>{"All"}</div>
                                </RoundedRadioButton>
                                <RoundedRadioButton
                                    isError={budgetTypeError}
                                    checked={budgetType === "per"}
                                    onChange={(e) => handleBudgetTypeChange("per")}
                                >
                                    <div>{t('Per Single Ad')}</div>
                                </RoundedRadioButton>
                            </BudgetTypeDiv>

                            <WidgetHeaderDiv>
                                Amount
                            </WidgetHeaderDiv>

                            <AmountWrapperDiv>
                                <Select
                                    classNamePrefix="Select"
                                    defaultValue={{ value: 'allTime', label: 'All Time' }}
                                    options={[
                                        { value: 'allTime', label: 'All Time' },
                                        { value: 'daily', label: 'Daily' }
                                    ]}
                                />

                                <span>HKD</span>

                                <FormInput isInvalid={false} />

                            </AmountWrapperDiv>

                            <WidgetHeaderDiv>
                                Format
                            </WidgetHeaderDiv>

                            <FormatWrapperDiv>
                                <div>
                                    <RoundedRadioButton
                                        isError={formatTypeError}
                                        checked={formatType === "display"}
                                        onChange={(e) => handleFormatTypeChange("display")}
                                    >
                                        <div>{"Display"}</div>
                                    </RoundedRadioButton>
                                    <RoundedRadioButton
                                        isError={formatTypeError}
                                        checked={formatType === "search"}
                                        onChange={(e) => handleFormatTypeChange("search")}
                                    >
                                        <div>{t('Search Ad')}</div>
                                    </RoundedRadioButton>
                                </div>
                                {
                                    formatType === "display" ?
                                        <>
                                            <p>This format includes all the placements appearing on Carlig's homepage and content pages.</p>
                                            <img src={DisplayAdSrc} />
                                        </>
                                        : formatType === "search" ?
                                            <>
                                                <p>This format includes all the placements appearing on Carlig's homepage and content pages.</p>
                                                <img src={SearchAdSrc} />
                                            </>
                                            : null
                                }

                            </FormatWrapperDiv>

                        </div>
                    </AdGroupContainerDiv>
                </WidgetContainerDiv>

                <WidgetFooterDiv>
                    <ButtonGroupDiv>
                        <PreviousButton>
                            <ArrowBack /> <span>Previous page</span>
                        </PreviousButton>
                        <ContinueButton onClick={handleCountinue}>
                            {t('dashBoard.widget.continue')}
                        </ContinueButton>
                    </ButtonGroupDiv>
                </WidgetFooterDiv>
            </>
        </Root>
    )
}

export default AdGroup