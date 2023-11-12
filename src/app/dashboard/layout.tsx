import TodoContextProvider from '@/providers/TodoContextProvider';
import { Sidebar } from '@/components/sidebar/Sidebar';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TodoContextProvider>
      <Sidebar />
      <div className={'ml-[256px]'}>{children}</div>
    </TodoContextProvider>
  );
}
