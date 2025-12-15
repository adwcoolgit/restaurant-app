import { useEffect } from 'react';
import { setToast } from '@/states/slices/uiSlice';
import { toast, Toaster } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/states/store';

export const PopupMessage: React.FC = () => {
  const message = useSelector((state: RootState) => state.ui.toastMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      toast.info(message);
      dispatch(setToast(''));
    }
  });
  return (
    <>
      <Toaster richColors position='top-center' />
    </>
  );
};
