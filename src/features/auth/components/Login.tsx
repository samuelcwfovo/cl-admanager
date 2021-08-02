import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from 'common/hooks/hooks';
import { authSelector, login, autoLogin, resetErrorMsg } from '../AuthSlice';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import logoPath from 'resources/images/carlig_logo.svg';
import AbsoultTopRightDiv from './styles/AbsoluteTopRightDiv'
import CenterDiv from './styles/CenterDiv';
import HeaderWrapper from './styles/HeaderWrapper';
import Form from './styles/Form';
import FormWrapper from './styles/FormWrapper';
import Button from './styles/Button';
import FormInput from './styles/FormInput';
import FormLabel from './styles/FormLabel';


const Login = () => {
    const { t } = useTranslation();


    let history = useHistory();
    let location = useLocation<any>();

    // cookies for remember me
    const [cookies, setCookie, removeCookie] = useCookies([]);

    // redux
    const dispatch = useAppDispatch();
    const { errorMessage, status, user } = useAppSelector(authSelector);

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => verifyEmail(e.target.value);
    const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => verifyPassword(e.target.value);
    const onRememberMeChanged = (e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked);


    const verifyEmail = (value: string = email) => {
        if (/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)) {
            setEmail(value);
            setEmailError(false);
            return true;
        }
        setEmailError(true)
    }

    const verifyPassword = (value: string = password) => {
        if (/(.|\s)*\S(.|\s)*/.test(value)) {
            setPassword(value);
            setPasswordError(false);
            return true
        }
        setPasswordError(true)
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (status === 'idle') {
            let pass = true;
            if (!verifyEmail()) { pass = false };
            if (!verifyPassword()) { pass = false };

            if (pass) {
                let cb = () => {
                    window.sessionStorage.setItem("f5Login", "true");
                    rememberMe ? setCookie('auto-login', true, { maxAge: 604800 }) : removeCookie('auto-login');

                }
                dispatch(login({ email, password, cb }));
            };
        }
    }


    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(resetErrorMsg());
        }
    }, [errorMessage])

    useLayoutEffect(() => {
        if (user) {
            console.log(user);
            if (user.status === 'pending') history.push('/auth/setup');

            if (user.status === 'active') {
                if (location.state?.from?.pathname) {
                    history.push(location.state.from.pathname);
                } else {
                    history.push('/');
                }
            }
        }
    }, [user])

    useLayoutEffect(() => {
        //cookies stored as string
        if (cookies['auto-login'] === 'true' || window.sessionStorage.getItem("f5Login") === 'true') {
            dispatch(autoLogin())
        }
    }, [])

    return (
        <>
            <AbsoultTopRightDiv>
                <p>{t('login.notHaveAccount')}
                    <a target="_blank" href="https://carlig.com/sign_up">
                        <span> {t('login.signup')}</span>
                    </a>
                </p>
            </AbsoultTopRightDiv>

            <CenterDiv>
                <div>
                    <HeaderWrapper>
                        <img src={logoPath} />
                        <h3> Ad manager</h3>
                    </HeaderWrapper>
                    <h1>{t('login.title')}</h1>

                    <Form>
                        <FormLabel>{t('login.email')}</FormLabel>
                        <br />
                        <FormInput type='email' isInvalid={emailError} onChange={onEmailChanged} />
                        <br />

                        <FormLabel>{t('login.password')}</FormLabel>
                        <br />
                        <FormInput type='password' isInvalid={passwordError} onChange={onPasswordChanged} />

                        <FormWrapper>
                            <label><input type='checkbox' onChange={onRememberMeChanged} />{t('login.rememberMe')}</label>
                            <p>{t('login.forgetPassword')}</p>
                        </FormWrapper>

                        <Button
                            onClick={handleSubmit}
                        >
                            {t('login.login')}
                        </Button>
                    </Form>
                </div>
            </CenterDiv>
        </>
    )
}

export default memo(Login);