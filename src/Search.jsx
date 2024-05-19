import React, { useState } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
const headers = ["name", "genre", "id"];
const data = [
  { name: "los jijis 2", genre: "comedia", id: 2 },
  { name: "los jijis 3", genre: "drama", id: 3 },
];
const Search = () => {
  const [searchParam, setsearchParam] = useState("Name");
  const [selectRow, setSelectRow] = useState();
  const handleSelect = (e) => {
    setsearchParam(e.target.value);
  };

  return (
    <Box p={3} px={10}>
      <Typography variant="h3" textAlign={"center"} pb={3}>
        Search
      </Typography>
      <Stack
        direction={"row"}
        gap={3}
        justifyContent={"center"}
        width={"100%"}
        pb={15}
      >
        <FormControl sx={{ width: "100px" }}>
          <InputLabel>Atribute</InputLabel>
          <Select value={searchParam} label="Atribute" onChange={handleSelect}>
            <MenuItem value={"Name"}>Name</MenuItem>
            <MenuItem value={"Genre"}>Genre</MenuItem>
            <MenuItem value={"Id"}>Id</MenuItem>
          </Select>
        </FormControl>
        <TextField placeholder="The godfather" />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Stack>
      <Stack  gap={1} direction={"row"} pb={1} justifyContent={"space-between"}>
        <Stack gap={1} direction={"row"}>
        <Button variant="contained">Modify</Button>
        <Button variant="contained">Create</Button>
        </Stack>
        <Button color="error" variant="contained">
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
                <TableCell key={index2}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
export default Search;
