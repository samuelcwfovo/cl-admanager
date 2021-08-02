import styled from 'styled-components/macro';
import color from 'styles/color';

interface Props {
    children?: JSX.Element;
    href: string;
}

const LinkSpanDiv = styled.div`
    
    display: inline;
    span {
        color: ${color.THEME};
    }

    a {
        text-decoration: none;
    }
`

const LinkSpan = (props: Props) => {

    return (
        <LinkSpanDiv>
            <a target="_blank" href={props.href}>
                <span>
                    {props.children}
                </span>
            </a>
        </LinkSpanDiv>
    )
}


export default LinkSpan;