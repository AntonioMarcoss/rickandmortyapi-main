
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const Login = ({ setToken, setUsername }) => {
  const [username, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username);
        setToken(data.token);
        setUsername(username);
      } else {
        setError(data.error || 'Erro no login');
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login - Rick & Morty Explorer
        </Typography>
        <TextField
          label="Usuário"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2" align="center">
            {error}
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Entrar
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
