import AuthForm from '@/components/auth/auth-form';
import { GuestLayout } from '@/components/layout';

export default function SigninPage() {
  return (
    <GuestLayout>
      <AuthForm />
    </GuestLayout>
  );
}
