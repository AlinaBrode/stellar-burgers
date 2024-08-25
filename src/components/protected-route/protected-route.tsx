import { ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { checkUserAuth } from '../../services/slices/user-slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const { isAuthChecked, data } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => console.log('protected route data =', data), [data]);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !data) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && data) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
