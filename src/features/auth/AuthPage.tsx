import React, { memo, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ContainerDiv from './styles/ContainerDiv'
import BackgroundDiv from './styles/BgDiv';
import FormDiv from './styles/FormDiv';
import bgPath from 'resources/images/visitor_bg.jpg';

const Login = React.lazy(() => import('./components/Login'));
const Setup = React.lazy(() => import('./components/Setup'));

const AuthPage = () => {

    return (
        <ContainerDiv>
            <BackgroundDiv backGroundPath={bgPath} />

            <FormDiv>

                <Suspense fallback={null}>
                    <Route exact path="/auth/login" component={Login} />
                    <Route exact path="/auth/setup" component={Setup} />
                </Suspense>
            </FormDiv>

        </ContainerDiv>

    )
}

export default memo(AuthPage)