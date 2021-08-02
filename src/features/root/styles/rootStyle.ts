import styled from 'styled-components/macro';
import color from 'styles/color';


export const RootDiv = styled.div`
    min-height: 100vh;
    width: 100vw;
    background-color: ${color.ROOT.BG};
`

export const NavMainDiv = styled.div`
    background-color: white;
    position: sticky;
    top: 0;
    border-bottom: solid .1rem ${color.ROOT.NAV_BORDER};
`

export const NavBarDiv = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 1340px;
    margin:  auto;
    padding: 2rem 0 1rem 0;
`


export const LogoDiv = styled.div`
    display: flex;
    flex-direction: row;

    & > img {
        height: 2.5rem;
        margin-right: .5rem;
    }

    & > h4 {
        margin:0;
        font-size: 1.2rem;
        white-space: nowrap;
        display: flex;
        align-items: center;
        margin-bottom: .3rem;
    }
`

export const NavContentDiv = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: row;
`

export const NavBarEndDiv = styled.div`
    justify-content: end;
    align-content: center;
    margin: auto 0 auto auto;
`

export const NavMenuSpan = styled.span`
    display: flex;
    align-content: center;
    align-items: center;

    & > img {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        margin-right: .5rem;
    }

    & > svg {
        margin-left: .5rem;
    }
`

export const RootMainDiv = styled.div`
    max-width: 1340px;
    margin:  auto;

`