import styled from 'styled-components/macro';

interface Props {
    backGroundPath: string;
}


const BgDiv = styled.div<Props>`
    background-image: url(${Props => Props.backGroundPath});
    flex: 3;
    background-position: center;
`

export default BgDiv
