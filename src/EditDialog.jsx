import {
  Stack,
  Table,
  TableHead,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CreateDialogLinePopUp from "./CreateDialogLinePopUp";
import { useParams } from "react-router-dom";
import UpdateDialogPopUp from "./UpdateDialogPopUp";
const headers = ["Actor", "Text", "Pose", "X position", "X Rotation", "Y position", "Z Rotation", "Z position", "Z Rotation"];
// actor: element.actor,
// text: element.text,
// pose: element.pose.poseName,
// x: element.x,
// xr: element.xr,
// y: element.y,
// yr: element.yr,
// z: element.z,
// zr: element.zr,
// idPose: element.idPose,
// idDialogLine: element.idDialogLine

const EditDialog = () => {
  const [selectRow, setSelectRow] = useState();
  const [openPopUp, setopenPopUp] = useState(false);
  const [openUpdatePopUp, setopenUpdatePopUp] = useState(false);
  const [dialogs, setDialogs] = useState([]);
  const [title, setTitle] = useState('')
  const { scriptid } = useParams()
  useEffect(() => {
    fetchDialogs();
    fetchTitle();

  }, []);
  const fetchDialogs = async () => {
    var result = await fetch(`http://localhost:8080/dialog/getbyscriptid/${scriptid}`)
    var data = await result.json()
    setDialogs(mapScript(data));
  }
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
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <Container maxWidth={"xl"}  >
      <CreateDialogLinePopUp open={openPopUp} handleClose={() => setopenPopUp(false)} fetchDialogs={fetchDialogs} idScript={scriptid} />


      <UpdateDialogPopUp open={openUpdatePopUp} handleClose={() => setopenUpdatePopUp(false)} fetchDialogs={fetchDialogs} idScript={scriptid} selectrow={selectRow} />
      <Typography variant="h3" textAlign={"center"} pb={3} pt={3}>
        {title}
      </Typography>
      <Stack p={3}>
        <Stack gap={1} direction={"row"} pb={1} justifyContent={"space-between"}>
          <Stack gap={1} direction={"row"}>
            <Button variant="contained" disabled={!selectRow} startIcon={<EditIcon />} onClick={() => setopenUpdatePopUp(true)}>Modify</Button>
            <Button variant="contained" onClick={() => setopenPopUp(true)} startIcon={<AddIcon />}>
              Add Dialog line
            </Button>
          </Stack>
          <Button color="error" disabled={!selectRow} variant="contained" startIcon={<DeleteIcon />} onClick={handleDelete}>
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
                onClick={() => {
                  setSelectRow(row)
                }
                }
              >
                {Object.values(row).map((cell, index) => (
                  index < headers.length && <TableCell key={index}>{cell}</TableCell>
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
      pose: element.pose.poseName,
      x: element.x,
      xr: element.xr,
      y: element.y,
      yr: element.yr,
      z: element.z,
      zr: element.zr,
      idPose: element.idPose,
      idDialogLine: element.idDialogLine
    })
  });
  return adapteScripts
}
export default EditDialog;
