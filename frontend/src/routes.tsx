import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps, Switch } from 'react-router';
import { getUserRoles, getUserToken } from 'redux/Login';
import Loader from './components/Loader/Loader';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));

export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  ADMIN: '/admin',
};

interface ProtectedRouteProps extends RouteProps {
  role?: 'admin';
}

const ProtectedRoute = ({ role, ...routeProps }: ProtectedRouteProps) => {
  const userToken = useSelector(getUserToken);
  const userRoles = useSelector(getUserRoles);
  const isAuthenticated = userToken !== null;
  const authenticationPath = PATHS.LOGIN;

  if (role !== undefined && (userRoles === undefined || !userRoles.includes(role))) {
    return <></>;
  }

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
      <ProtectedRoute exact path={PATHS.ADMIN} component={Admin} role="admin" />
      <Route path={PATHS.LOGIN} component={Login} />
    </Switch>
  </Suspense>
);

export default routes;
