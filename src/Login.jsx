import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Box, Stack, Typography } from "@mui/material";

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
      height={"100vh"}
      marginX={"auto"}
      direction={"column"}
      justifyContent={"space-between"}
    >
      <Typography variant="h3">Script gestor</Typography>
      <GoogleLogin
        width={250}
        onSuccess={responseMessage}
        onError={errorMessage}
      />
      <Box height={"1px"} />
    </Stack>
  );
};

export default Login;
