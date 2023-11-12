'use client';

import {
  BorderAllOutlined,
  CalendarMonthOutlined,
  EventAvailableOutlined,
  ScheduleSendOutlined
} from '@mui/icons-material';
import { SidebarItem } from '@/components/sidebar/SidebarItem';
import { SidebarAddItem } from '@/components/sidebar/SidebarAddItem';

const menuItems = [
  {
    name: 'All',
    icon: <BorderAllOutlined width={16} />,
    path: 'dashboard'
  },
  {
    name: 'Today',
    icon: <ScheduleSendOutlined width={16} />,
    path: 'dashboard?filter=today'
  },
  {
    name: 'Upcoming',
    icon: <CalendarMonthOutlined width={16} />,
    path: 'dashboard?filter=upcoming'
  },
  {
    name: 'Completed',
    icon: <EventAvailableOutlined width={16} />,
    path: 'dashboard?filter=completed'
  }
];

export const Sidebar = () => {
  return (
    <div className={'fixed z-10 h-screen w-[256px] bg-[#fcf9f9]'}>
      <SidebarAddItem />
      {menuItems.map((item) => (
        <SidebarItem key={item.name} props={item} />
      ))}
    </div>
  );
};
