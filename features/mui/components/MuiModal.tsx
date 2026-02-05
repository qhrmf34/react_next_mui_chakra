"use client"

import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import {useState} from "react";

export default function MuiModal(){
  const[open,setOpen] = useState(false);
  return(
    <>
      <Button onClick={()=>setOpen(true)}>상세 보기 (MUI)</Button>
      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>상세 정보</DialogTitle>
        <DialogContent>이것은 MUI로 만든 모달입니다.</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}