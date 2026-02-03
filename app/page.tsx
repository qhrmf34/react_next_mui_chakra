'use client'; // 필수!

import { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

export default function Home() {
  const [count, setCount] = useState<number>(0); 

  return (
    <Stack spacing={2} padding={5}>
      <Typography variant="h4">타입스크립트 Next.js + MUI</Typography>
      <Typography variant="body1">현재 카운트: {count}</Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        올리기
      </Button>
    </Stack>
  );
}