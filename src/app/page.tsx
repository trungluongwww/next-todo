import { redirect } from 'next/navigation';

const defaultNavigate = 'dashboard';

export default function Home() {
  redirect(defaultNavigate);
}
