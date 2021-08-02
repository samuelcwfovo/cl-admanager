import color from 'styles/color';



const customStyles = (isError: boolean) => ({
    control: (provided: any, state: any) => {
        return {
            ...provided,
            border: state.isFocused ? `1px solid ${color.THEME}` :
                isError ? `1px solid ${color.FORM.BORDER.ERROR}` : `1px solid ${color.FORM.BORDER.NORMAL}`,
            backgroundColor: state.isFocused ? '' :
                isError ? `${color.FORM.BG.ERROR}` : `${color.FORM.BG.NORMAL}`,
            boxShadow: state.isFocused ? `0 0 0 1px ${color.THEME}` : '',
            ":hover": {
                borderColor: `${color.THEME}`,
            }
        }
    },
    valueContainer: (provided: any, state: any) => ({
        ...provided,
        padding: '.6rem 1rem .6rem 1rem',
    }),
    singleValue: (provided: any, state: any) => ({
        ...provided,
        fontFamily: "'Lato',sans-serif",
        margin: 0
    }),
    input: (provided: any, state: any) => ({
        ...provided,
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
    }),

    indicatorSeparator: () => ({}),

    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isSelected ?
            `${color.THEME}`
            : state.isFocused ?
                '#39d1b360'
                : null,
        ':active': {
            ...provided[':active'],
            backgroundColor: state.isSelected ? `${color.THEME}` : '#39d1b399',
        }
    }),
})


export default customStyles;