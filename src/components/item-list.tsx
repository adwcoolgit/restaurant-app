import { ComponentProps } from '@/types/component-type';
import { Wrapper } from './wrapper';
import { Items } from '@/features/detail/type';
import { ItemCard } from './items-card';

type Props = Items & ComponentProps;

export const ItemList: React.FC<Props> = ({ className, ...items }) => {
  return (
    <Wrapper>
      <div className='grid md:grid-cols-4 lg:grid-cols-5'>
        {items.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
    </Wrapper>
  );
};
