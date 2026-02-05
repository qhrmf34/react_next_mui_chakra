"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Chip,
} from "@mui/material";

type User = { id: number; name: string; email: string };

type Props = {
  users: User[];
  onEdit: (user: User) => void;
};

export default function UserTable({ users, onEdit }: Props) {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // 검색 필터링
  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        9. Tabs + Table 컴포넌트
      </Typography>

      {/* Tabs */}
      <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ mb: 2 }}>
        <Tab label={`전체 (${users.length})`} />
        <Tab label="최근 3명" />
        <Tab label="이메일 검색" />
      </Tabs>

      {/* Tab 0: 전체 목록 */}
      {tabValue === 0 && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>이메일</TableCell>
                <TableCell align="right">액션</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id} hover>
                  <TableCell>{u.id}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => onEdit(u)}>
                      수정
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Tab 1: 최근 3명 */}
      {tabValue === 1 && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>이메일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, 3).map((u, idx) => (
                <TableRow key={u.id} hover>
                  <TableCell>
                    {idx === 0 && <Chip label="NEW" size="small" color="primary" sx={{ mr: 1 }} />}
                    {u.id}
                  </TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Tab 2: 이메일 검색 */}
      {tabValue === 2 && (
        <Box>
          <TextField
            label="이메일 검색"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="이메일을 입력하세요"
          />

          {searchTerm && (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell>이메일</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <TableRow key={u.id} hover>
                        <TableCell>{u.id}</TableCell>
                        <TableCell>{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        검색 결과가 없습니다
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {!searchTerm && (
            <Typography color="text.secondary" variant="body2">
              이메일을 입력하면 검색됩니다
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
}
