import React, { useState, useEffect } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import CreatePopUp from "./CreatePopUp";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";


const baseUrl = 'http://localhost:8080/script/'
const headers = ["name", "genre", "id"];
const data = [
  { name: "los jijis 2", genre: "comedia", id: 2 },
  { name: "los jijis 3", genre: "drama", id: 3 },
];

const Search = () => {
  const navigate = useNavigate();


  const [scripts, setScripts] = useState([]);
  const [searchParam, setsearchParam] = useState("getall");
  const [userInput, setUserInput] = useState("")
  const [selectRow, setSelectRow] = useState();
  const [openPopUp, setopenPopUp] = useState(false);
  const handleSelect = (e) => {
    setsearchParam(e.target.value);
  };
  const fetchScripts = async () => {
    var result
    if (searchParam === "getall") {
      result = await fetch(baseUrl + searchParam);
    } else {
      if (userInput === "") {
        alert("Fulfull the search param")
      } else {
        result = await fetch(baseUrl + searchParam + userInput);
      }
    }

    var data = await result.json()
    setScripts(mapScript(data));

  };
  useEffect(() => {
    fetchScripts();

  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/script/delete/${selectRow.idScript}`, {
        method: 'DELETE',
      }); fetchScripts();
      console.log('Success:', await response.json());
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <Container maxWidth={"md"}>
      <CreatePopUp open={openPopUp} handleClose={() => setopenPopUp(false)} fetchScripts={fetchScripts} />
      <Typography variant="h3" textAlign={"center"} pb={3}>
        Search
      </Typography>
      <Stack
        direction={"row"}
        gap={3}
        justifyContent={"center"}
        width={"100%"}
        pb={5}
      >
        <FormControl sx={{ width: "100px" }}>
          <InputLabel>Filter</InputLabel>
          <Select value={searchParam} label="Atribute" onChange={handleSelect}>
            <MenuItem value={"getall"} onChange={(e) => { setUrlParam(e.target.value); setUserInput("") }}>No filters</MenuItem>
            <MenuItem value={"getbyname/"} onChange={(e) => { setUrlParam(e.target.value) }}>Name</MenuItem>
            <MenuItem value={"getbygenrename/"} onChange={(e) => { setUrlParam(e.target.value) }}>Genre</MenuItem>
          </Select>
        </FormControl>
        <TextField placeholder="The godfather" onChange={(e) => { setUserInput(e.target.value) }} />
        <IconButton onClick={(e) => fetchScripts()}>
          <SearchIcon />

        </IconButton>
      </Stack>
      <Stack gap={1} direction={"row"} pb={1} justifyContent={"space-between"}>
        <Stack gap={1} direction={"row"}>
          <Button variant="contained" startIcon={<EditIcon />} onClick={() => navigate(`/edit/${selectRow.idScript}`)}>Modify</Button>
          <Button variant="contained" onClick={() => setopenPopUp(true)} startIcon={<AddIcon />}>
            Create
          </Button>
        </Stack>
        <Button color="error" variant="contained" startIcon={<DeleteIcon />} onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
      <Table >
        <TableHead >
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {scripts?.map((row) => (
            <TableRow
              key={row.idScript}
              sx={{
                cursor: "pointer",
                background: selectRow?.idScript === row.idScript ? "#6299c4" : "inherit",
              }}
              onClick={() => setSelectRow(row)}
            >
              {Object.values(row).map((cell, index2) => (
                <TableCell key={index2}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

const mapScript = (scripts) => {
  var adapteScripts = []
  scripts?.forEach(element => {
    adapteScripts.push({
      scriptName: element.scriptName,
      genre: element.genre.genreName,
      idScript: element.idScript
    })
  });
  return adapteScripts
}
export default Search;
