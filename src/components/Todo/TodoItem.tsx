import { ITodoItem } from '@/interfaces/todo';
import { CheckOutlined, Remove } from '@mui/icons-material';
import { formatUSDateString } from '@/utilities/formatDate';
import { useTodoContext } from '@/providers/TodoContextProvider';
import TodoUpdateModal from '@/components/Todo/TodoUpdateModal';
import { useCallback, useState } from 'react';

export default function TodoItem({ todoItem }: { todoItem: ITodoItem }) {
  const todoContext = useTodoContext();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCompleteItem = () => {
    if (todoItem.isCompleted) {
      todoContext?.removeTodoItem(todoItem.id || '');
      return;
    }

    todoItem.isCompleted = true;
    todoContext?.updateTodoItem(todoItem);
  };

  const handleClickItem = () => {
    setIsOpenModal(true);
  };

  const isOverdue = useCallback(() => {
    const now = new Date();
    const dueDate = new Date(todoItem.dueDate);

    if (
      now.getFullYear() > dueDate.getFullYear() ||
      now.getMonth() > dueDate.getMonth() ||
      now.getDate() > dueDate.getDate()
    ) {
      return true;
    }
  }, [todoItem.dueDate]);

  return (
    <li className={'border-b border-gray-200'}>
      <div className={'flex cursor-pointer duration-100 hover:scale-[1.01]'}>
        <div className={'h-full w-6'}>
          <button
            onClick={handleCompleteItem}
            className={
              'group relative flex h-6 w-6 items-center justify-center'
            }
          >
            <span
              className={
                'absolute left-1/2 top-1/2 -z-10 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-400 transition group-active:bg-amber-500'
              }
            ></span>
            {todoItem.isCompleted ? (
              <Remove
                className={
                  'rounded-full bg-red-800  text-white opacity-0 group-hover:opacity-100'
                }
              />
            ) : (
              <CheckOutlined
                className={
                  'rounded-full bg-green-800 text-white opacity-0 group-hover:opacity-100'
                }
              />
            )}
          </button>
        </div>
        <div className={'ml-2 grow pb-2'} onClick={handleClickItem}>
          <p className={'text-md max-w-2xl font-semibold'}>
            {todoItem?.name || 'No name'}
            {isOverdue() && !todoItem.isCompleted && (
              <span className={'text-error ml-2 text-xs'}>Over due</span>
            )}
          </p>
          <div
            className={
              'flex items-center justify-between text-sm text-gray_600'
            }
          >
            <div className={'grow'}>
              <p className={'max-w-2xl'}>
                {todoItem?.description || 'No description'}
              </p>
            </div>
            <div
              className={
                'ml-4 min-w-[75px] text-xs text-primaryAmber md:text-sm'
              }
            >
              <p>{formatUSDateString(todoItem.dueDate)}</p>
            </div>
          </div>
        </div>
      </div>
      <TodoUpdateModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        data={todoItem}
      />
    </li>
  );
}
