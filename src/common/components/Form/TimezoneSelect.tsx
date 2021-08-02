import TimezoneSelect, { ITimezone, ITimezoneOption } from 'react-timezone-select';
import selectStyle from './styles/SelectStyle';

interface Props {
    onChange: (timezone: ITimezoneOption) => void;
    isError: boolean;
    value : ITimezone;
}



const _TimezoneSelect = (props: Props) => {

    return (
        <div style={{
            marginBottom: '1.5rem',
            marginTop: '.5rem',
        }}>
            <TimezoneSelect
                styles={selectStyle(props.isError)}
                onChange={props.onChange}
                value={props.value}
            />
        </div>

    )
}

export default _TimezoneSelect