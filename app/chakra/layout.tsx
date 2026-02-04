import ChakraProviders from "./providers";

export default function ChakraLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return <ChakraProviders>{children}</ChakraProviders>
}