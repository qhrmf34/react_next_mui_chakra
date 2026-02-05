"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Input,
  NativeSelect,
  Separator,
  Stack,
  Text,
  Textarea,
  HStack,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
} from "@chakra-ui/react";
import { FiPlus, FiTrash2, FiShoppingCart, FiEdit2 } from "react-icons/fi";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { Field } from "@/components/ui/field";
import { Avatar } from "@/components/ui/avatar";
type Product = { id: number; name: string; price: string };
type User = { id: number; name: string; email: string };

type Props = {
  products: Product[];
  users: User[];
  onAddToCart: () => void;

  onCreateUser: (payload: {name: string; email:string}) => Promise<void>;
  onUpdateUser: (id: number, payload: {name:string; email:string}) => Promise<void>;
  onDeleteUser: (id: number) => Promise<void>;
};

// 재사용 가능한 Section 컴포넌트
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card.Root>
      <Card.Header>
        <Text fontWeight="bold">{title}</Text>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card.Root>
  );
}

export default function DemoSections({
  products,
  users,
  onAddToCart,
  onCreateUser,
  onUpdateUser,
  onDeleteUser }: Props) {
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [age, setAge] = useState("");
  const [checked, setChecked] = useState(false);
  const [gender, setGender] = useState("male");

  // Users CRUD dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [uName, setUName] = useState("");
  const [uEmail, setUEmail] = useState("");

  const openCreate = () => {
    setMode("create");
    setEditingUser(null);
    setUName("");
    setUEmail("");
    setDialogOpen(true);
  };

  const openEdit = (u: User) => {
    setMode("edit");
    setEditingUser(u);
    setUName(u.name);
    setUEmail(u.email);
    setDialogOpen(true);
  };

  const submitUser = async () => {
    if (!uName.trim() || !uEmail.trim()) {
      alert("이름/이메일을 입력하세요.");
      return;
    }
    try {
      if (mode === "create") {
        await onCreateUser({ name: uName, email: uEmail });
      } else if (editingUser) {
        await onUpdateUser(editingUser.id, { name: uName, email: uEmail });
      }
      setDialogOpen(false);
    } catch {
      alert("저장 실패 (중복 이메일/서버 오류 가능)");
    }
  };

  


  return (
    <Stack gap={4} p={4}>
      {/* 1) Button 섹션 */}
      <Section title="1) Button">
        <HStack gap={2} wrap="wrap">
          <Button>Primary</Button>
          <Button colorPalette="purple">Secondary</Button>
          <Button variant="outline" onClick={() => setName("")}>
            <FiTrash2 style={{ marginRight: 8 }} />
            삭제
          </Button>
          <Button variant="subtle">
            <FiPlus style={{ marginRight: 8 }} />
            추가
          </Button>
          <Button colorPalette="red" disabled>
            비활성
          </Button>
        </HStack>
      </Section>

      {/* 2) Input / Textarea 섹션 */}
      <Section title="2) Input / Textarea">
        <Stack gap={3}>
          <Field label="이름">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 입력"
            />
          </Field>

          <Field label="메모">
            <Textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모 입력"
            />
          </Field>
        </Stack>
      </Section>

      {/* 3) Native Select 섹션 */}
      <Section title="3) Native Select">
        <Stack gap={2}>
          <NativeSelect.Root width="240px">
            <NativeSelect.Field value={age} onChange={(e) => setAge(e.target.value)}>
              <option value="">선택 안함</option>
              <option value="10">10대</option>
              <option value="20">20대</option>
              <option value="30">30대</option>
              <option value="40">40대</option>
              <option value="50">50대</option>
            </NativeSelect.Field>
          </NativeSelect.Root>
          {age && <Text>선택한 나이: {age}대</Text>}
        </Stack>
      </Section>

      {/* 4) Checkbox / RadioGroup 섹션 */}
      <Section title="4) Checkbox / RadioGroup">
        <Stack gap={3}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <Text>약관에 동의합니다</Text>
          </label>
          <Separator />

          {/* v3 스니펫 구조로 변경된 라디오 그룹 */}
          <RadioGroup value={gender} onValueChange={(e) => setGender(e.value||"male")}>
            <Stack gap={2}>
              <Radio value="female">여성</Radio>
              <Radio value="male">남성</Radio>
              <Radio value="other">기타</Radio>
            </Stack>
          </RadioGroup>

          <Text fontSize="sm" color="gray.500">선택된 성별: {gender}</Text>
        </Stack>
      </Section>

      {/* 5) Users List 섹션 (CRUD) */}
      <Section title="5) Users (CRUD)">
        <Stack gap={4}>
          <HStack justify="space-between">
            <Text fontWeight="medium">유저 목록</Text>
            <Button size="sm" onClick={openCreate}>
              <FiPlus style={{ marginRight: 8 }} />
              유저 추가
            </Button>
          </HStack>

          {users.map((u) => (
            <HStack key={u.id} justify="space-between">
              <HStack gap={3}>
                <Avatar size="sm" name={u.name} />
                <Box>
                  <Text fontWeight="medium">{u.name}</Text>
                  <Text fontSize="sm" opacity={0.7}>
                    {u.email}
                  </Text>
                </Box>
              </HStack>
              <HStack gap={2}>
                <Button size="sm" variant="outline" onClick={() => openEdit(u)}>
                  <FiEdit2 style={{ marginRight: 4 }} />
                  수정
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  colorPalette="red"
                  onClick={() => {
                    if (confirm("정말 삭제할까요?")) onDeleteUser(u.id);
                  }}
                >
                  <FiTrash2 style={{ marginRight: 4 }} />
                  삭제
                </Button>
              </HStack>
            </HStack>
          ))}
        </Stack>

        {/* User Dialog */}
        <DialogRoot open={dialogOpen} onOpenChange={(e) => setDialogOpen(e.open)}>
          <DialogBackdrop />
          <DialogPositioner>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{mode === "create" ? "유저 추가" : "유저 수정"}</DialogTitle>
                <DialogCloseTrigger />
              </DialogHeader>
              <DialogBody>
                <Stack gap={4}>
                  <Field label="이름">
                    <Input value={uName} onChange={(e) => setUName(e.target.value)} placeholder="이름 입력" />
                  </Field>
                  <Field label="이메일">
                    <Input value={uEmail} onChange={(e) => setUEmail(e.target.value)} placeholder="이메일 입력" />
                  </Field>
                </Stack>
              </DialogBody>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>취소</Button>
                <Button onClick={submitUser}>저장</Button>
              </DialogFooter>
            </DialogContent>
          </DialogPositioner>
        </DialogRoot>
      </Section>

      {/* 6) Products Grid 섹션 */}
      <Section title="6) Products Grid (장바구니 +1)">
        <Stack gap={4}>
          <Text opacity={0.7} fontSize="sm">카드를 클릭하면 장바구니가 증가합니다.</Text>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
            gap={4}
          >
            {products.map((p) => (
              <Card.Root
                key={p.id}
                onClick={onAddToCart}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ transform: "translateY(-4px)", shadow: "md" }}
              >
                <Card.Body>
                  <Text fontWeight="bold">{p.name}</Text>
                  <Text color="purple.600" fontWeight="semibold">{p.price}</Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="outline" width="full" size="sm">
                    <FiShoppingCart style={{ marginRight: 8 }} />
                    담기
                  </Button>
                </Card.Footer>
              </Card.Root>
            ))}
          </Box>
        </Stack>
      </Section>
    </Stack>
  );
}