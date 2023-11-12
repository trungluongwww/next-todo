import { useState } from 'react';
import TodoAddModal from '@/components/Todo/TodoAddModal';
import { AddCircleOutlined } from '@mui/icons-material';

export const SidebarAddItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div
        className={
          'relative m-2 flex cursor-pointer items-center rounded-md px-2 py-2 text-primaryAmber hover:bg-[#f6efee]'
        }
        onClick={() => setIsModalOpen(true)}
      >
        <AddCircleOutlined width={22} />
        <p className={'ml-2 font-semibold'}>Add task</p>
      </div>
      <TodoAddModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        data={null}
      />
    </div>
  );
};
