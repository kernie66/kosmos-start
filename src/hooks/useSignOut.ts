import { useClerk } from '@clerk/tanstack-react-start';
import { useRouter } from '@tanstack/react-router';

export const useSignOut = () => {
  const clerk = useClerk();
  const router = useRouter();

  const signOut = async () => {
    await clerk.signOut();
    await router.invalidate();
    await router.navigate({ to: '/' });
  };

  return { signOut };
};
