import { TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | undefined;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
