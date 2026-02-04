"use client";

import { useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import TopNav from "./components/TopNav";
import DemoSections from "./components/DemoSections";
import { products, users } from "./data";

export default function MuiPlayground() {
  //  “여러 섹션에서 같이 쓰는 상태”만 여기에 둠
  const [cartCount, setCartCount] = useState(3);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopNav cartCount={cartCount} />

      <DemoSections
        products={products}
        users={users}
        onAddToCart={handleAddToCart}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          장바구니에 상품이 추가되었습니다!
        </Alert>
      </Snackbar>
    </Box>
  );
}
