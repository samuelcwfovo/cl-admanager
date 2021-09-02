

import { DrakBgFilterDiv, AbsoluteCenterDiv, BoxDiv } from './styles';

type Props = {
    children: JSX.Element;
}

const Root = ({ children }: Props) => {
    return (
        <DrakBgFilterDiv>
            <AbsoluteCenterDiv>
                <BoxDiv>
                    {children}
                </BoxDiv>
            </AbsoluteCenterDiv>
        </DrakBgFilterDiv>
    )
}


export default Root