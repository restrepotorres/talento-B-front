import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Search from "./Search";
import EditDialog from "./EditDialog"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#181A1B",
      paper: "#0C1219",
      greeni:"#FFFFFF"
    },

    primary: {main:"#488bbf"},
    secondary: { main:"#FFFFFF"},
    error: { main:"#b71f1f"},
    green: { main:"#29aa29"}
  },
});

function App() {
  return (<>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/edit/:scriptid" element={<EditDialog />} />
        <Route path="*" element={<Search />} />
        <Route path="/" element={<Login />} />
      </Routes>

      {/* <Login></Login> */} </ThemeProvider></>
  );
}

export default App;
