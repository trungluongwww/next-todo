'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { ITodoItem } from '@/interfaces/todo';

interface ITodoContextProps {
  todoItems: ITodoItem[];
  addTodoItem: (item: ITodoItem) => void;
  removeTodoItem: (id: string) => void;
  updateTodoItem: (item: ITodoItem) => void;
}

const keyTodoItemStorage = 'todoItems';

const TodoContext = createContext<ITodoContextProps | undefined>(undefined);

const getTodoItemsFromStorage = () => {
  if (typeof localStorage === 'undefined') return [];

  const strData = localStorage.getItem(keyTodoItemStorage);

  return strData ? (JSON.parse(strData) as ITodoItem[]) : [];
};

const storeTodoItems = (items: ITodoItem[]) => {
  if (typeof localStorage === 'undefined') return;

  localStorage.setItem(keyTodoItemStorage, JSON.stringify(items));
};

export default function TodoContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [todoItems, setTodoItems] = useState<ITodoItem[]>([]);

  useEffect(() => {
    setTodoItems(getTodoItemsFromStorage());
  }, []);

  useEffect(() => {
    if (todoItems?.length) storeTodoItems(todoItems);
  }, [todoItems]);

  const addTodoItem = useCallback((item: ITodoItem) => {
    if (!item.id) item.id = Date.now().toString();

    setTodoItems((pre) => [...pre, item]);
  }, []);

  const removeTodoItem = useCallback((id: string) => {
    setTodoItems((pre) => pre.filter((item) => item.id !== id));
  }, []);

  const updateTodoItem = useCallback((item: ITodoItem) => {
    setTodoItems((pre) =>
      pre.map((oldItem) => (oldItem.id === item.id ? item : oldItem))
    );
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todoItems: todoItems,
        addTodoItem,
        removeTodoItem,
        updateTodoItem
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => useContext(TodoContext);
