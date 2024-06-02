import { LockOutlined } from "@mui/icons-material";
import { Box, Avatar, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services";
import { useAuthentication } from "../authentication/authenticationContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login: doLogin } = useAuthentication();

  const handleLogin = async () => {
    try {
      // Call the login service passing email and password
      const response = await login(email, password);

      // Store the token in local storage
      localStorage.setItem("user", JSON.stringify(response));
      doLogin(response);

      // Redirect to the admin page
      navigate("/");
    } catch (error) {
      // TODO
    }
  };

  return (
    <Box
      sx={{
        mt: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
        <LockOutlined />
      </Avatar>
      <Typography variant="h5">Login</Typography>
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
