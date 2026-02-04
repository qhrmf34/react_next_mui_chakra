"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import TopNav from "./components/TopNav";
import DemoSections from "./components/DemoSections";
import { products, users } from "./data";

export default function ChakraPlayground() {
  const [cartCount, setCartCount] = useState(3);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    alert("장바구니에 상품이 추가되었습니다!");
  };

  return (
    <Box>
      <TopNav cartCount={cartCount} />
      <DemoSections products={products} users={users} onAddToCart={handleAddToCart} />
    </Box>
  );
}
