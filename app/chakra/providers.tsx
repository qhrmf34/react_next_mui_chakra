"use client"

import { ChakraProvider, defaultSystem} from "@chakra-ui/react";
import { ColorModeProvider } from "@/components/ui/color-mode";
import React from "react";
export default function ChakraProviders({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}