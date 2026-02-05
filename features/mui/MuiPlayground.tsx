"use client";

import { useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import TopNav from "./components/TopNav";
import DemoSections from "./components/DemoSections";
import { products } from "./data";

type User = { id: number; name: string; email: string };

type Props = {
  initialUsers: User[];
};

export default function MuiPlayground({ initialUsers }: Props) {
  // 장바구니(기존)
  const [cartCount, setCartCount] = useState(3);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    setSnackbarOpen(true);
  };

  //  users(DB 연동) - 서버에서 받은 초기 데이터 사용
  const [users, setUsers] = useState<User[]>(initialUsers);

  // 추가
  const createUser = async (payload: { name: string; email: string }) => {
    const res = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? "create failed");

    //  서버가 생성 결과(id 포함)를 반환한다고 가정
    setUsers((prev) => [data, ...prev]);
  };

  // 수정
  const updateUser = async (id: number, payload: { name: string; email: string }) => {
    const res = await fetch(`/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? "update failed");

    setUsers((prev) => prev.map((u) => (u.id === id ? data : u)));
  };

  // 삭제
  const deleteUser = async (id: number) => {
    const res = await fetch(`/users/${id}`, { method: "DELETE" });
    const text = await res.text();
    if (!res.ok) {
    throw new Error(`DELETE ${res.status}: ${text}`);
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <Box sx={{ flexGrow: 1 }} suppressHydrationWarning>
      <TopNav cartCount={cartCount} />

      <DemoSections
        products={products}
        users={users}
        loadingUsers={false}
        onAddToCart={handleAddToCart}
        onCreateUser={createUser}
        onUpdateUser={updateUser}
        onDeleteUser={deleteUser}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          장바구니에 상품이 추가되었습니다!
        </Alert>
      </Snackbar>
    </Box>
  );
}
