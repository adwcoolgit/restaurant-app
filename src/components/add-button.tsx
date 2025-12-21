import { ComponentProps } from '@/types/component-type';
import { Button } from './ui/button';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useUpdateQty } from '@/features/cart/cart-update-qty.service';
import { useDeleteItem } from '@/features/cart/cart-delete-item.service copy';
import { Item, UpdateQtyVariables } from '@/features/cart/type';
import { useLocalStorageState } from '@/lib/storages';
import { isLoginSKey } from '@/features/auth/type';

type Props = {
  itemId: number;
  itemQty: number;
  onChangeTotal?: React.Dispatch<React.SetStateAction<number>>;
} & ComponentProps;

export const AddItemButton: React.FC<Props> = ({
  className,
  itemId,
  itemQty,
}) => {
  const [qty, setQty] = useState<number>(0);
  const [isQtyChanged, setIsQtyChanged] = useState<boolean>(false);
  const [isLogin, setIsLogin, hydrated] = useLocalStorageState<
    boolean | undefined
  >(isLoginSKey(), undefined);
  const params: UpdateQtyVariables = {
    id: itemId,
    params: { quantity: qty },
  };
  const { mutate: updateQty, isPending } = useUpdateQty({});
  const { mutate: deleteItem } = useDeleteItem({});

  useEffect(() => {
    if (isQtyChanged && isLogin) {
      const delayDebounceFn = setTimeout(() => {
        if (qty > 0) {
          updateQty(params);
          setIsQtyChanged(false);
        } else {
          deleteItem(itemId);
        }
      }, 100);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [isQtyChanged]);

  return (
    <div className='flex items-center gap-x-4'>
      <Button
        variant='outline'
        className='size-10 rounded-full border'
        disabled={isPending}
        onClick={() => {
          if (itemQty > 0) {
            setQty(itemQty - 1);
            setIsQtyChanged(true);
          }
        }}
      >
        <Icon
          icon='ic:round-remove'
          width='24'
          height='24'
          className='text-black'
        />
      </Button>
      <p className='flex-center w-5 text-lg font-semibold'>{itemQty}</p>
      <Button
        variant='auth'
        className='size-10 rounded-full border'
        disabled={isPending}
        onClick={() => {
          setQty(itemQty + 1);
          setIsQtyChanged(true);
        }}
      >
        <Icon icon='ic:round-add' width='24' height='24' />
      </Button>
    </div>
  );
};
