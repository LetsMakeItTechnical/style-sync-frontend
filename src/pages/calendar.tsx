import CalendarComponent from '@/components/Calendar';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import RouteGuard from '@/components/RouteGuard';
import { initializeStore, useStore } from '@/lib/store';
import Box from '@mui/material/Box';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
// https://github.com/vercel/next.js/blob/canary/examples/with-zustand/src/components/page.tsx

const Calendar = ({
  initialZustandState,
}: {
  initialZustandState: Record<string, any>;
}) => {
  return (
    <div style={{ padding: '3px' }}>
      <ResponsiveAppBar />
      <Box
        sx={{
          p: 5,
          pb: 0,
          flexGrow: 1,
          borderRadius: 1,
          boxShadow: 'none',
          backgroundColor: 'background.paper',
        }}
      ></Box>
      <CalendarComponent />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const zustandStore = initializeStore();

  return {
    props: {
      // the "stringify and then parse again" piece is required as next.js
      // isn't able to serialize it to JSON properly
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
    },
  };
};

export default RouteGuard(Calendar);
