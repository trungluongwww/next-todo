'use client';

import { useSearchParams } from 'next/navigation';
import { formatUSDateString } from '@/utilities/formatDate';
import TodoListItem from '@/components/Todo/TodoListItem';

export default function Page() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  return (
    <div className={'mx-auto min-w-[325px] max-w-[910px] px-[55px] py-12'}>
      <div className={'flex justify-between border-b border-gray-200 pb-3'}>
        <h1>
          <span className={'mr-2 text-2xl font-semibold capitalize'}>
            {filter || 'all tasks'}
          </span>
          <small className={'text-gray_500'}>
            {filter === 'today' ? formatUSDateString(new Date()) : ''}
          </small>
        </h1>
      </div>
      <TodoListItem filter={filter} />
    </div>
  );
}
