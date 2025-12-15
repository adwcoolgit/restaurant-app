import { safeImageSrc } from '@/lib/utils';
import { ComponentProps } from '@/types/component-type';
import { X } from 'lucide-react';
import Image from 'next/image';
import noImage from '@/../public/images/no-image-available.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { fullImage } from '@/states/slices/uiSlice';
import { useEffect } from 'react';

interface Props extends ComponentProps {
  image: string;
}

export const ImageFull: React.FC<Props> = ({ image, className }) => {
  const isFull = useSelector((state: RootState) => state.ui.isFullImage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFull) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFull]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 flex h-screen w-full bg-black/60 ${isFull ? 'block' : 'hidden'} `}
    >
      <X
        className={`absolute top-2 right-2 flex cursor-pointer justify-self-end invert`}
        onClick={() => dispatch(fullImage(false))}
      />
      <div className='relative top-1/2 mx-5 h-3/4 w-full -translate-y-1/2'>
        <Image
          src={safeImageSrc(image) ?? noImage}
          alt='detail product'
          fill
          className='object-contain'
        />
      </div>
    </div>
  );
};
