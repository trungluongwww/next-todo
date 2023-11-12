import TodoItem from '@/components/Todo/TodoItem';
import { useTodoContext } from '@/providers/TodoContextProvider';
import { useEffect, useState } from 'react';
import { ITodoItem } from '@/interfaces/todo';

export default function TodoListItem({ filter }: { filter: string | null }) {
  const todoContext = useTodoContext();

  const [items, setItems] = useState<ITodoItem[]>([]);

  useEffect(() => {
    const now = new Date();
    switch (filter) {
      case 'today':
        setItems(
          todoContext?.todoItems?.filter((item) => {
            const dueDate = new Date(item.dueDate);
            return (
              dueDate.getFullYear() === now.getFullYear() &&
              dueDate.getMonth() === now.getMonth() &&
              dueDate.getDate() === now.getDate()
            );
          }) || []
        );
        break;

      case 'upcoming':
        setItems(
          todoContext?.todoItems?.filter((item) => {
            const dueDate = new Date(item.dueDate);
            return dueDate.valueOf() > now.valueOf();
          }) || []
        );
        break;

      case 'completed':
        setItems(
          todoContext?.todoItems?.filter((item) => {
            return item.isCompleted;
          }) || []
        );
        break;

      default:
        // return all incomplete item
        setItems(
          todoContext?.todoItems?.filter((item) => !item.isCompleted) || []
        );
    }
  }, [todoContext?.todoItems, filter]);

  return (
    <div className={'min-w-[325px] max-w-[910px]'}>
      <ul className={'mt-2 space-y-2'}>
        {items.map((item) => (
          <TodoItem key={item.id} todoItem={item} />
        ))}
        {!items?.length && (
          <li className={'font-semibold text-gray_500'}>Empty</li>
        )}
      </ul>
    </div>
  );
}
