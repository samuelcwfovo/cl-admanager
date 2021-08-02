import React from 'react';
import { BrowserRouter as Router, Switch, Route, RouteProps, Redirect } from 'react-router-dom';

import GlobalStyle from 'styles/globalStyle';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from 'common/hooks/hooks';
import { authSelector } from './features/auth/AuthSlice';

import 'locale/i18n';

import AuthPage from './features/auth/AuthPage';
import AccountInfoPage from 'features/accountInfo/AccountInfoPage';
import BillingPage from 'features/billing/BillingPage';
import PaymentRecordPage from 'features/paymentRecord/PaymentRecordPage';
import DashBoardPage from 'features/dashBoard/DashBoardPage';

interface PrivatePouteProps extends RouteProps {
  component: any;
}

const PrivateRoute = (props: PrivatePouteProps) => {
  const { component: Component, ...rest } = props;

  const { user } = useAppSelector(authSelector);

  const isValidUser = user?.status === 'active'

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isValidUser ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: routeProps.location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <>
      <ToastContainer closeButton={false} />
      <Router>
        <Switch>
          <Route exact path="/auth/login" component={AuthPage} />
          <Route exact path="/auth/setup" component={AuthPage} />
          <PrivateRoute exact path="/account" component={AccountInfoPage} />
          <PrivateRoute exact path="/billing" component={BillingPage} />
          <PrivateRoute exact path="/payment" component={PaymentRecordPage} />
          <PrivateRoute exact path="/" component={DashBoardPage} />

        </Switch>
      </Router>

      <GlobalStyle />
    </>
  );
}

export default App;
