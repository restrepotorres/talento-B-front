import { useState, useEffect } from "react";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Search from "./Search";
import EditDialog from "./EditDialog"




function App() {
  const [count, setCount] = useState(0);
  const url = "http://localhost:8080/dialog/getall";
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(url);
      const data = await result.json();

      console.log(data);
    };
    fetchData();
  },[]);

  return (<>
    <Routes>
      <Route path="/search" element={<Search/>}/>
      <Route path="/edit" element={<EditDialog/>}/>
      <Route path="*" element={<Search/>}/>
      <Route path="/" element={<Login/>}/>
    </Routes>

    {/* <Login></Login> */}</>
  );
}

export default App;
