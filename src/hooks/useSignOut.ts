import { useClerk } from '@clerk/tanstack-react-start';
import { nprogress } from '@mantine/nprogress';
import { useRouter } from '@tanstack/react-router';

export const useSignOut = () => {
  const clerk = useClerk();
  const router = useRouter();

  const signOut = async () => {
    await clerk.signOut();
    nprogress.set(50);
    await router.invalidate();
    nprogress.set(75);
    await router.navigate({ to: '/' });
    nprogress.complete();
  };

  return { signOut };
};
