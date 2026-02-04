"use client";

import { useState } from "react";
import {
  Button,
  TextField,
  Stack,
  Box,
  Paper,
  Typography,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Card,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Switch from "@mui/material/Switch";

type Product = { id: number; name: string; price: string };
type User = { id: number; name: string; email: string };

type Props = {
  products: Product[];
  users: User[];
  onAddToCart: () => void;
};

export default function DemoSections({ products, users, onAddToCart }: Props) {
  const [value, setValue] = useState("");
  const [age, setAge] = useState(""); //  string으로 통일
  const [checked, setChecked] = useState(false);
  const [gender, setGender] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  const handleClear = () => setValue("");
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <Stack spacing={4} padding={3}>
      {/* 1. Button */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>1. Button 컴포넌트</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Button variant="contained">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClear}>삭제</Button>
          <Button variant="text" endIcon={<AddIcon />}>추가</Button>
          <Button variant="contained" color="error" disabled>비활성</Button>
          <Button variant="contained" size="small">Small</Button>
          <Button variant="contained" size="large">Large</Button>
        </Stack>
      </Paper>

      {/* 2. TextField */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>2. TextField 컴포넌트</Typography>
        <Stack spacing={2}>
          <TextField
            label="이름"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            placeholder="이름을 입력하세요"
          />
          <TextField type="password" label="비밀번호" error helperText="잘못된 비밀번호입니다." />
          <TextField label="메모" multiline rows={4} placeholder="메모를 입력하세요" fullWidth />
          <TextField type="email" label="이메일" required fullWidth />
        </Stack>
      </Paper>

      {/* 3. Select */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>3. Select 컴포넌트</Typography>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel>나이</InputLabel>
            <Select value={age} label="나이" onChange={(e) => setAge(e.target.value)}>
              <MenuItem value="">선택 안함</MenuItem>
              <MenuItem value="10">10대</MenuItem>
              <MenuItem value="20">20대</MenuItem>
              <MenuItem value="30">30대</MenuItem>
              <MenuItem value="40">40대</MenuItem>
              <MenuItem value="50">50대 이상</MenuItem>
            </Select>
          </FormControl>

          {age && <Typography color="primary">선택한 나이: {age}대</Typography>}
        </Stack>
      </Paper>

      {/* 4. Checkbox & Radio */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>4. Checkbox & Radio</Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>Checkbox</Typography>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
              label="약관에 동의합니다"
            />
            <FormControlLabel control={<Checkbox defaultChecked />} label="마케팅 수신 동의" />
            <FormControlLabel control={<Checkbox disabled />} label="비활성화" />
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle1" gutterBottom>Radio Button</Typography>
            <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)}>
              <FormControlLabel value="female" control={<Radio />} label="여성" />
              <FormControlLabel value="male" control={<Radio />} label="남성" />
              <FormControlLabel value="other" control={<Radio />} label="기타" />
            </RadioGroup>
            {gender && <Typography color="secondary" sx={{ mt: 1 }}>선택: {gender}</Typography>}
          </Box>
        </Stack>
      </Paper>

      {/* 5. Switch & Chip */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>5. Switch & Chip</Typography>
        <Stack spacing={2}>
          <FormControlLabel
            control={<Switch checked={switchOn} onChange={(e) => setSwitchOn(e.target.checked)} />}
            label={switchOn ? "알림 켜짐" : "알림 꺼짐"}
          />

          <Box>
            <Typography variant="subtitle2" gutterBottom>Tags (Chip)</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="React" color="primary" />
              <Chip label="MUI" color="secondary" />
              <Chip label="JavaScript" variant="outlined" />
              <Chip label="삭제 가능" onDelete={() => alert("삭제!")} color="error" />
              <Chip label="클릭 가능" onClick={() => alert("클릭!")} color="success" />
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* 6. Dialog */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>6. Dialog (모달)</Typography>
        <Button variant="contained" onClick={handleDialogOpen}>모달 열기</Button>

        <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>알림</DialogTitle>
          <DialogContent>
            <Typography>정말로 삭제하시겠습니까?</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              이 작업은 되돌릴 수 없습니다.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>취소</Button>
            <Button onClick={handleDialogClose} variant="contained" color="error">삭제</Button>
          </DialogActions>
        </Dialog>
      </Paper>

      {/* 7. List */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>7. List</Typography>
        <List>
          {users.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton edge="end">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar><PersonIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* 8. Grid */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>8. 반응형 Grid 시스템</Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card
                onClick={onAddToCart}
                sx={{
                  p: 3,
                  textAlign: "center",
                  bgcolor: "#f5f5f5",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": { bgcolor: "#e0e0e0", transform: "translateY(-4px)", boxShadow: 3 },
                  "&:active": { transform: "scale(0.98)" },
                }}
              >
                <ShoppingCartIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="text.secondary">{product.price}</Typography>
                <Button variant="outlined" size="small" startIcon={<AddIcon />} sx={{ mt: 2 }}>
                  장바구니
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* 9. Typography */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>9. Typography</Typography>
        <Stack spacing={1}>
          <Typography variant="h1">h1. Heading</Typography>
          <Typography variant="h2">h2. Heading</Typography>
          <Typography variant="h3">h3. Heading</Typography>
          <Typography variant="h4">h4. Heading</Typography>
          <Typography variant="h5">h5. Heading</Typography>
          <Typography variant="h6">h6. Heading</Typography>
          <Typography variant="subtitle1">subtitle1. Lorem ipsum</Typography>
          <Typography variant="subtitle2">subtitle2. Lorem ipsum</Typography>
          <Typography variant="body1">body1. Lorem ipsum dolor sit amet...</Typography>
          <Typography variant="body2">body2. Lorem ipsum dolor sit amet...</Typography>
          <Typography variant="caption">caption text</Typography>
          <Typography variant="overline">overline text</Typography>
        </Stack>
      </Paper>

      {/* 10. Color */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>10. 색상(Color)</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="contained" color="success">Success</Button>
          <Button variant="contained" color="error">Error</Button>
          <Button variant="contained" color="warning">Warning</Button>
          <Button variant="contained" color="info">Info</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
