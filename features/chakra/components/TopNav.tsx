"use client";

import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { FiBell, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import { Tooltip } from "@/components/ui/tooltip";
import { Avatar } from "@/components/ui/avatar";
import { ColorModeButton } from "@/components/ui/color-mode";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

type Props = { cartCount: number };

export default function TopNav({ cartCount }: Props) {
  return (
    <Box
      borderBottomWidth="1px"
      px={4}
      py={3}
      bg="bg"
      color="fg"
      borderColor="border"
    >
      <Flex align="center">
        <Heading size="md">Chakra 컴포넌트 연습장</Heading>
        <Spacer />

        <HStack gap={3}>
          <ColorModeButton />
          {/* 알림 버튼 섹션 */}
          <Tooltip content="알림">
            <Box position="relative">
              <IconButton aria-label="notifications" variant="ghost">
                <FiBell />
              </IconButton>
              {cartCount > 0 && (
                <Badge
                  colorPalette="red"
                  variant="solid"
                  position="absolute"
                  top="-1"
                  right="-1"
                  borderRadius="full"
                  px={1.5}
                  fontSize="xs"
                >
                  {cartCount}
                </Badge>
              )}
            </Box>
          </Tooltip>

          {/* 설정 버튼 */}
          <Tooltip content="설정">
            <IconButton aria-label="settings" variant="ghost">
              <FiSettings />
            </IconButton>
          </Tooltip>

          {/* 프로필 메뉴 섹션 */}
          <MenuRoot>
            <MenuTrigger asChild>
              <IconButton aria-label="profile" variant="ghost">
                <Avatar size="xs" name="User" />
                <FiUser />
              </IconButton>
            </MenuTrigger>

            <MenuContent>
              <MenuItem value="profile">내 프로필</MenuItem>
              <MenuItem value="settings">설정</MenuItem>
              <MenuSeparator />
              <MenuItem
                value="logout"
                color="red.500"
                onClick={() => alert("로그아웃!")}
              >
                <FiLogOut style={{ marginRight: 8 }} />
                로그아웃
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </HStack>
      </Flex>
    </Box>
  );
}