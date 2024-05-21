import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const Login = () => {
  const responseMessage = (response) => {
    console.log(response);
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <Stack
      maxWidth={300}
      height={"80vh"}
      marginX={"auto"}
      direction={"column"}
      justifyContent={"space-between"}
      pt={7}
    >
      <Typography variant="h3">Script gestor</Typography>
      <TextField label='User' />
      <TextField label="Password" />
      <Button variant="contained" color="green">Login</Button>
      <Typography variant="h5" textAlign={'center'}>New here?</Typography>
      <Button variant="contained"  >Create account</Button>
      <Typography variant="h5" textAlign={'center'}>Or Login with Google</Typography>
      <Stack marginLeft={3}><GoogleLogin
        width={250}
        onSuccess={responseMessage}
        onError={errorMessage}
      /></Stack>
      <Box height={"1px"} />
    </Stack>
  );
};

export default Login;
