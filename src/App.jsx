import './styles/App.css';
import React, { useState, useMemo } from 'react';
import CharacterCard from './components/CharacterCard';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useCharacterContext } from './contexts/CharacterContext';

function App() {
  const [search, setSearch] = useState('');
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
      console.error('Erro ao buscar personagens:', error);
      setCharacters([]);
    }
  };

  const filteredCharacters = useMemo(() => {
    return characters.filter((char) =>
      char.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [characters, search]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" gutterBottom align="center">
        Rick and Morty Procurar
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          mb: 4,
        }}
        className="search-bar"
      >
        <TextField
          fullWidth
          label="Buscar personagem"
          aria-label="Buscar personagem"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch} aria-label="Buscar">
          Buscar
        </Button>
      </Box>

      <Box className="card-list">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        ) : (
          <Typography variant="body1" align="center">
            {search.trim() === ''
              ? 'Digite um nome e clique em "Buscar" para encontrar personagens.'
              : 'Nenhum personagem encontrado.'}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default App;
