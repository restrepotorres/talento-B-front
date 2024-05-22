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
  const [selectRow, setSelectRow] = useState(null);
  const [openPopUp, setopenPopUp] = useState(false);
  const [userData, setuserData] = useState();
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
    setuserData(JSON.parse(localStorage.getItem("userData")))
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
      <Stack direction={'row'} justifyContent={'space-between'} py={3}>
        <Box width={"1px"} />
        <Typography variant="h3" textAlign={"center"} >
          Script Catalog
        </Typography>
        <Box component={'img'} src={userData ? userData.picture : "https://cdn.vectorstock.com/i/500p/63/42/avatar-photo-placeholder-icon-design-vector-30916342.jpg"} width={70} alt="usr image" sx={{ borderRadius: 13, }} />
      </Stack>
      <Stack
        direction={"row"}
        gap={3}
        justifyContent={"center"}

        width={"100%"}
        pb={5}
      >
        <FormControl sx={{ width: "150px" }}>
          <InputLabel>Filter</InputLabel>
          <Select value={searchParam} label="Atribute" onChange={handleSelect}>
            <MenuItem value={"getall"} onChange={(e) => { setUrlParam(e.target.value); setUserInput("") }}>No filters</MenuItem>
            <MenuItem value={"getbyname/"} onChange={(e) => { setUrlParam(e.target.value) }}>Name</MenuItem>
            <MenuItem value={"getbygenrename/"} onChange={(e) => { setUrlParam(e.target.value) }}>Genre</MenuItem>
          </Select>
        </FormControl>
        <TextField placeholder="Search" onChange={(e) => { setUserInput(e.target.value) }} />
        <IconButton onClick={(e) => fetchScripts()} sx={{ background: 'silver', alignSelf: 'center' }}>
          <SearchIcon />

        </IconButton>
      </Stack>
      <Stack gap={1} direction={"row"} pb={1} justifyContent={"space-between"}>
        <Stack gap={1} direction={"row"}>
          <Button variant="contained" disabled={!selectRow} startIcon={<EditIcon />} onClick={() => navigate(`/edit/${selectRow.idScript}`)}>Modify</Button>
          <Button variant="contained" onClick={() => setopenPopUp(true)} startIcon={<AddIcon />}>
            Create
          </Button>
        </Stack>
        <Button color="error" variant="contained" disabled={!selectRow} startIcon={<DeleteIcon />} onClick={handleDelete}>
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
