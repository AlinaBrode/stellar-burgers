import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/slices/user-slice';
import { useEffect } from 'react';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const locationState = location.state as { background: Location };
  const background = locationState?.background;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/stellar-burgers/' element={<ConstructorPage />} />
          <Route path='/stellar-burgers/feed' element={<Feed />} />
          <Route path='*' element={<NotFound404 />} />
          <Route
            path='/stellar-burgers/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/stellar-burgers/stellar-burgers/register'
            element={
              <ProtectedRoute regRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/stellar-burgers/forgot-password'
            element={
              <ProtectedRoute regRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/stellar-burgers/reset-password'
            element={
              <ProtectedRoute regRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/stellar-burgers/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/stellar-burgers/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/stellar-burgers/feed/:number'
              element={
                <Modal title='order info' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/stellar-burgers/ingredients/:id'
              element={
                <Modal
                  title='order info'
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/stellar-burgers/profile/orders/:number'
              element={
                <Modal title='order info' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
};

export default App;
