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
  Container,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CreatePopUp from "./CreatePopUp";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CreateDialogLinePopUp from "./CreateDialogLinePopUp";
import { useParams } from "react-router-dom";
const headers = ["Actor", "Text", "Position", "Pose"];

const EditDialog = () => {
  const [selectRow, setSelectRow] = useState();
  const [openPopUp, setopenPopUp] = useState(false);
  const [dialogs, setDialogs] = useState([]);
  const [title, setTitle] = useState('')
  const { scriptid } = useParams()
  const fetchDialogs = async () => {
    var result = await fetch(`http://localhost:8080/dialog/getbyscriptid/${scriptid}`)
    var data = await result.json()
    setDialogs(mapScript(data));
  }

  useEffect(() => {
    fetchDialogs();
    fetchTitle();

  }, []);

  const fetchTitle = async () => {
    const result = await fetch(`http://localhost:8080/script/getbyid/${scriptid}`)
    const script = await result.json()
    setTitle(script.scriptName)
  }


  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/dialog/delete/${selectRow.idDialogLine}`, {
        method: 'DELETE',
      }); fetchDialogs();
      console.log('Success:', await response.json());
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Container maxWidth={"xl"}  >
      <CreateDialogLinePopUp open={openPopUp} handleClose={() => setopenPopUp(false)} fetchDialogs={fetchDialogs} idScript={scriptid} />
      <Typography variant="h3" textAlign={"center"} pb={3} pt={3}>
        {title}
      </Typography>
      <Stack p={3}>
        <Stack gap={1} direction={"row"} pb={1} justifyContent={"space-between"}>
          <Stack gap={1} direction={"row"}>
            <Button variant="contained" startIcon={<EditIcon />}>Modify</Button>
            <Button variant="contained" onClick={() => setopenPopUp(true)} startIcon={<AddIcon />}>
              Add Dialog line
            </Button>
          </Stack>
          <Button color="error" variant="contained" startIcon={<DeleteIcon />} onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
        <Table>
          <TableHead >
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dialogs?.map((row, index) => (
              <TableRow
                key={row.idDialogLine}
                sx={{
                  cursor: "pointer",
                  background: selectRow?.idDialogLine === row.idDialogLine ? "#6299c4" : "inherit",
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

    </Container>
  );
};


const mapScript = (scripts) => {
  var adapteScripts = []
  scripts?.forEach(element => {
    adapteScripts.push({
      actor: element.actor,
      text: element.text,
      x: element.x,
      pose: element.pose.poseName,
      idDialogLine: element.idDialogLine,
      positiony: element.y,
      positionz: element.z,
      rotationx: element.xr,
      rotationy: element.yr,
      rotationz: element.zr
    })
  });
  return adapteScripts
}

export default EditDialog;
