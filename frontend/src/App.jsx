
import './styles/App.css';
import React, { useState, useEffect } from 'react';
import CharacterCard from './components/CharacterCard';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useCharacterContext } from './contexts/CharacterContext';
import Login from './components/Login';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [search, setSearch] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const { characters, setCharacters } = useCharacterContext();

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${search}`);
      const data = await response.json();

      if (data.results) {
        setCharacters(data.results);
      } else {
        setCharacters([]);
      }
    } catch (error) {
      console.error("Erro ao buscar personagens:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername('');
  };

  useEffect(() => {
    if (!token) setCharacters([]);
  }, [token]);

  if (!token) return <Login setToken={setToken} setUsername={setUsername} />;

  return (
    <Box sx={{ p: 2, maxWidth: "900px", margin: "auto" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Bem-vindo, {username}</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
      </Box>
      <Typography variant="h4" gutterBottom textAlign="center">Rick & Morty Explorer</Typography>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <TextField label="Buscar personagem" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button variant="contained" onClick={handleSearch}>Buscar</Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        <AnimatePresence>
          {characters.map((char, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <CharacterCard character={char} />
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
}

export default App;
