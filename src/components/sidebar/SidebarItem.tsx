import Link from 'next/link';
import { ReactNode } from 'react';

interface ISidebarItemProps {
  name: string;
  icon: ReactNode;
  path: string;
}

export const SidebarItem = ({ props }: { props: ISidebarItemProps }) => {
  return (
    <div key={props.name}>
      <Link
        href={`/${props.path}`}
        className={
          'mx-2 flex cursor-pointer items-center space-x-2 rounded-md px-2 py-2 text-[#585858] hover:bg-[#f6efee]'
        }
      >
        {props.icon} <p>{props.name}</p>
      </Link>
    </div>
  );
};
