import React from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const responseMessage = (response) => {
    console.log(response);
    const userData = jwtDecode(response.credential)
    console.log(userData)
    localStorage.setItem(`userData`, JSON.stringify(userData))
    console.log(localStorage.getItem("userData").picture)
    navigate("/search")
  };

  const errorMessage = (error) => {
    console.log(error);
  };
  const handleLogin = async () => {
    console.log('hey there')
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
      console.log('Success:', script);
      handleClose()
      navigate(`/edit/${script.idScript}`)
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <Stack
      sx={{ background: '#33383E', borderRadius: 5 }}
      maxWidth={400}
      mt={22}
      height={"45vh"}
      marginX={"auto"}
      direction={"column"}
      justifyContent={"space-between"}
      textAlign={'center'}

    >
      <Typography variant="h3">Script gestor</Typography>
      <Typography variant="h5" m={2}  >Script Gestor is a WebApp to create and manage movies scripts </Typography>
      <Stack marginX={"auto"}><GoogleLogin
        width={250}
        onSuccess={responseMessage}
        onError={errorMessage}
      />
        <Typography variant="h6" marginY={2}>OR </Typography>
        <Button variant="contained" onClick={() => navigate("/search")}>Continue without login</Button>

      </Stack>

      <Typography variant="overline" >Made with love 💚 by <a sx={{ color: 'red' }} target="_blank" href="https://github.com/RestrepoTorres">@RestrepoTorres</a></Typography>
    </Stack>

  );
};
export default Login;
