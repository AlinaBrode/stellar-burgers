import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { fetchPersonalOrders } from '../../services/slices/personal-orders-slice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.personalOrder);
  useEffect(() => {
    dispatch(fetchPersonalOrders());
  }, []);
  return <ProfileOrdersUI orders={orders} />;
};
