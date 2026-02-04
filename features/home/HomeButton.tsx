"use client"
import Link from "next/link";
import Button from "@mui/material/Button";

export default function HomeButton() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Home</h1>
        <Button 
          variant="outlined" 
          component={Link} 
          href="/mui"
          sx={{mr: 4}}
        >
          MUI 연습장으로 이동
        </Button>
        <Button 
          variant="outlined" 
          component={Link} 
          href="/chakra"
        >
          Chakra 연습장으로 이동
        </Button>
      </main>
  );
}