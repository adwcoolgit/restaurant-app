import { FieldValues } from 'react-hook-form';

export type MessageResponseProps = {
  status: number | undefined;
  message: string | undefined;
};

export type ComponentProps = {
  children?: React.ReactNode;
  className?: string;
};

export type GenericFormProps<T extends FieldValues> = {
  children?: React.ReactNode;
  className?: string;
  isLogin: boolean;
  isPending?: boolean;
  isError?: boolean;
  error?: Error | null;
};

export type MenuItems = {
  menuTile: string;
  href: string;
  subMenuTitle?: MenuItems[];
};
