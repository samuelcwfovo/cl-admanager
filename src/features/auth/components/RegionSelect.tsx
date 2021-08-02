import React, { useMemo } from 'react';
import Select from 'react-select'

import selectStyle from './styles/SelectStyle';


interface Props {
    onchange: (region: string) => void;
    isError: boolean;
}

const options = [];

const RegionSelect = (props: Props) => {

    const getOption = useMemo(() => {
        const data = require('./Data/RegionData.json')
        console.log("get")
        return data;
    }, [])

    const handleChange = (region: any) => {
        props.onchange(region.value);
    };

    return (
        <div style={{
            marginBottom: '1.5rem',
            marginTop: '.5rem',
        }}>
            <Select
                placeholder={'Choose region'}
                onChange={handleChange}
                options={getOption}
                styles={selectStyle(props.isError)}
            />
        </div>
    )
}

export default RegionSelect;