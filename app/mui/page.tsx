import MuiPlayground from "@/features/mui/MuiPlayground";

type User = { id: number; name: string; email: string };

async function getUsers(): Promise<User[]> {
  const BASE = process.env.BACKEND_URL!;
  const res = await fetch(`${BASE}/api/users`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const initialUsers = await getUsers();
  return <MuiPlayground initialUsers={initialUsers} />;
}
