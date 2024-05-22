import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CreatePopUp = ({ open, handleClose, fetchScripts }) => {


  const [data, setData] = useState([]);
  const [selectGenre, setSelectGenre] = useState();
  const [scriptName, setScriptName] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:8080/genre/getall");
      setData(await result.json());
    };
    fetchData();
  }, []);


  const handleSubmit = async () => {
    if (!scriptName || !selectGenre) {
      alert("Fulfill all fields")
      return
    }
    const requestData = { scriptName: scriptName, idGenre: selectGenre }
    try {
      const response = await fetch('http://localhost:8080/script/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }); fetchScripts();
      const script = await response.json()
      handleClose()
      navigate(`/edit/${script.idScript}`)
    } catch (error) {
      console.error('Error:', error);
    }
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>Creation</DialogTitle>
      <DialogContent>
        <Stack direction={"row"} gap={1} pt={2}>
          <FormControl sx={{ width: "100px" }}>
            <InputLabel>Genre</InputLabel>
            <Select label="Genre" onChange={(e) => setSelectGenre(e.target.value)} >
              {data?.map((genre) => {
                return (<MenuItem key={genre.idgenre} value={genre.idgenre} >{genre.genreName}</MenuItem>)
              })
              }
            </Select>
          </FormControl>
          <TextField label="Script name" onChange={(e) => setScriptName(e.target.value)} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleSubmit} >Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePopUp;
