import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps, Switch } from 'react-router';
import { getUserToken } from 'redux/Login';
import Loader from './components/Loader/Loader';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
};

const ProtectedRoute = ({ ...routeProps }: RouteProps) => {
  const userToken = useSelector(getUserToken);
  const isAuthenticated = userToken !== null;
  const authenticationPath = PATHS.LOGIN;

  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: authenticationPath }} />;
  }
};

const routes = (): JSX.Element => (
  <Suspense fallback={<Loader />}>
    <Switch>
      <ProtectedRoute exact path={PATHS.HOME} component={Home} />
      <Route path={PATHS.LOGIN} component={Login} />
    </Switch>
  </Suspense>
);

export default routes;
