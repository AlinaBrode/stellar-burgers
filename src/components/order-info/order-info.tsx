import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { fetchOrderInfo } from '../../services/slices/order-info-slice';

export const OrderInfo: FC = () => {
  const { orderInfo, isOrderInfoLoading } = useSelector(
    (state: RootState) => state.orderInfo
  );
  const { ingredients } = useSelector((state: RootState) => state.ingredients);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.number) {
      dispatch(fetchOrderInfo(Number(params.number)));
    }
  }, [params]);

  const orderData = orderInfo?.length
    ? orderInfo[0]
    : {
        createdAt: '',
        ingredients: [],
        _id: '',
        status: '',
        name: '',
        updatedAt: 'string',
        number: 0
      };

  /* Готовим данные для отображения */
  const orderInfoStat = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isOrderInfoLoading || orderInfoStat === null) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfoStat} />;
};
