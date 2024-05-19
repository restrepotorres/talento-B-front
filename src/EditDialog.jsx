import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TextField,
  TableHead,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
} from "@mui/material";

import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CreatePopUp from "./CreatePopUp";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CreateDialogLinePopUp from "./CreateDialogLinePopUp";
const headers = ["actor", "text", "position"];
const data = [
  { actor: "juan", text: "comedia", position: 2, id: 1 },
  { actor: "juanito", text: "polvoraaa", position: 2, id: 2 },
];
const EditDialog = () => {
  const [selectRow, setSelectRow] = useState();
  const [openPopUp, setopenPopUp] = useState(false);
  return (
    <>
      <CreateDialogLinePopUp open={openPopUp} handleClose={() => setopenPopUp(false)} />
      <Typography variant="h3" textAlign={"center"} pb={3}>
        Script Name
      </Typography>
      <Stack p={3}>
        <Stack gap={1} direction={"row"} pb={1} justifyContent={"space-between"}>
          <Stack gap={1} direction={"row"}>
            <Button variant="contained" startIcon={<EditIcon />}>Modify</Button>
            <Button variant="contained" onClick={() => setopenPopUp(true)} startIcon={<AddIcon />}>
              Add Dialog line
            </Button>
          </Stack>
          <Button color="error" variant="contained" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Stack>
        <Table>
          <TableHead sx={{ backgroundColor: "#9e9e9e" }}>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  cursor: "pointer",
                  background: selectRow?.id === row.id ? "#80d8ff" : "white",
                }}
                onClick={() => setSelectRow(row)}
              >
                {Object.values(row).map((cell, index2) => (
                  index2 < headers.length && <TableCell key={index2}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>

    </>
  );
};

export default EditDialog;
