import React, { useRef } from 'react';
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';


import Button from '@material-ui/core/Button';
import { useAppSelector, useAppDispatch } from 'common/hooks/hooks';
import { authSelector, logout } from 'features/auth/AuthSlice';



import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RootDiv, NavBarDiv, LogoDiv, NavContentDiv, NavBarEndDiv, NavMainDiv, NavMenuSpan, RootMainDiv } from './styles/rootStyle';
import logoPath from 'resources/images/carlig_logo.svg';
import { useTranslation } from 'react-i18next';


const menuOption = [
    {
        key: 'accountSetting',
        laction: '/account'
    },
    {
        key: 'billingSetting',
        laction: '/billing'
    },
    {
        key: 'billingRecord',
        laction: '/payment'
    },
    {
        key: 'helpCenter',
        laction: '/help'
    },
    {
        key: 'TC',
        laction: '/tc'
    }
]

type Props = {
    children: JSX.Element;
}

const Root = ({ children }: Props) => {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(authSelector);
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const { t } = useTranslation();

    let history = useHistory();

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const anchorElRef = useRef(null);

    const handleClose = () => { setIsOpen(false) };

    const handleClick = () => {
        setIsOpen(true);
    };

    const navRef = useRef(null);

    return (
        <RootDiv>
            <NavMainDiv ref={navRef}>
                <NavBarDiv>
                    <LogoDiv>
                        <img src={logoPath} />
                        <h4> Ad manager</h4>
                    </LogoDiv>
                    <NavContentDiv>
                        <NavBarEndDiv>
                            <Button onClick={handleClick}>
                                <NavMenuSpan>
                                    <img src={user?.iconUrl} />
                                    {user?.name}
                                    <ExpandMoreIcon />
                                </NavMenuSpan>
                            </Button>
                            <div ref={anchorElRef} />
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorElRef.current}
                                keepMounted
                                open={isOpen}
                                onClose={handleClose}
                                getContentAnchorEl={null}
                                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                transformOrigin={{ vertical: "top", horizontal: "center" }}
                            >
                                {
                                    menuOption.map((option) => (
                                        <MenuItem key={option.key}
                                            onClick={() => {
                                                history.push(option.laction);
                                                handleClose();
                                            }}>
                                            {t('root.' + option.key)}
                                        </MenuItem>
                                    ))
                                }
                                <MenuItem onClick={() => {
                                    window.sessionStorage.setItem("f5Login", "false");
                                    removeCookie('auto-login');
                                    dispatch(logout());
                                    history.push('/auth/login');
                                }}>{t('root.logout')}</MenuItem>
                            </Menu>
                        </NavBarEndDiv>
                    </NavContentDiv>
                </NavBarDiv>
            </NavMainDiv>
            <RootMainDiv>
                {children}
            </RootMainDiv>
        </RootDiv>
    )
}

export default Root