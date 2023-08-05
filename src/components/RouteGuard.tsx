import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const RouteGuard = (Component: any) => {
  const AuthenticatedComponent = () => {
    const { isLoggedInCheck, isLoggedIn } = useStore((store) => store);
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      const authCheck = () => {
        isLoggedInCheck();
        setAuthorized(isLoggedIn);
      };

      authCheck();

      const preventAccess = () => setAuthorized(false);

      router.events.on('routeChangeStart', preventAccess);
      router.events.on('routeChangeComplete', authCheck);

      return () => {
        router.events.off('routeChangeStart', preventAccess);
        router.events.off('routeChangeComplete', authCheck);
      };
    }, [isLoggedInCheck, router, router.events, isLoggedIn]);

    // Adjust component usage to match MUI's API
    return authorized ? (
      <Component />
    ) : (
      <Box
        display='flex'
        height='100vh'
        width='100vw'
        justifyContent='center'
        alignItems='center'
      >
        <CircularProgress size={60} />{' '}
      </Box>
    );
  };
  return AuthenticatedComponent;
};

export default RouteGuard;
