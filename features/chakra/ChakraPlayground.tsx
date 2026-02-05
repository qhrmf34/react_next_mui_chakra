"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import TopNav from "./components/TopNav";
import DemoSections from "./components/DemoSections";
import { products, users } from "./data";

type User = {id: number; name: string; email: string};

type Props = {
  initialUsers: User[];
}


export default function ChakraPlayground({initialUsers}: Props) {
  const [cartCount, setCartCount] = useState(3);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const createUser = async(payload: {name: string; email: string}) => {
    const res = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if(!res.ok) throw new Error(data?.message ?? "create failed");
    
    setUsers((prev)=>[data, ...prev]);
  };

  const updateUser = async(id: number,payload: {name: string; email: string}) => {
    const res = await fetch(`/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? "update failed");

    setUsers((prev) => prev.map((u) => (u.id === id ? data : u)));
  };

  const deleteUser = async(id: number)=>{
    const res = await fetch(`/users/${id}`, {
      method: "DELETE"});
      const text = await res.text();
      if(!res.ok) {
        throw new Error(`DELETE ${res.status}: ${text}`);
      }
      setUsers((prev) => prev.filter((u)=>u.id!==id));
    };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    alert("장바구니에 상품이 추가되었습니다!");
  };

  return (
    <Box bg="bg" color="fg" minH="100vh">
      <TopNav cartCount={cartCount} />
      <DemoSections
        users={users}
        products={products}
        onAddToCart={handleAddToCart}
        onCreateUser={createUser}
        onUpdateUser={updateUser}
        onDeleteUser={deleteUser}
      />
    </Box>
  );

}
