import { LockOutlined } from "@mui/icons-material";
import { Box, Avatar, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services";
import { useAuthentication } from "../authentication/authenticationContext";

/**
 * Component representing the login page.
 * Renders a form for user authentication.
 * @returns {JSX.Element} Login component.
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login: doLogin, user } = useAuthentication();
  const isLoggedInUser = user?.token;

  const handleLogin = async () => {
    try {
      // Call the login service passing email and password
      const response = await login(email, password);

      doLogin(response);

      // Redirect to the admin page
      navigate("/");
    } catch (error) {
      // TODO
    }
  };

  useEffect(() => {
    if (isLoggedInUser) {
      navigate("/");
    }
  }, []);

  return !isLoggedInUser ? (
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
      <Box component="form" noValidate sx={{ mt: 1 }}>
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
  ) : null;
};

export default Login;
