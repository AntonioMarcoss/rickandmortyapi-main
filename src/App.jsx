import './styles/App.css';
import React, { useState, useMemo } from 'react';
import CharacterCard from './components/CharacterCard';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useCharacterContext } from './contexts/CharacterContext';

function App() {
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { characters, setCharacters } = useCharacterContext();

  const handleSearch = async () => {
    if (!search.trim()) {
      setErrorMessage('Ops! Você esqueceu de digitar o nome do personagem.');
      setCharacters([]);
      return;
    }

    setErrorMessage(''); 

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${search}`);
      const data = await response.json();
      if (data.results) {
        setCharacters(data.results);
      } else {
        setErrorMessage('Nenhum personagem encontrado. Que tal tentar outro nome?');
        setCharacters([]);
      }
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
      setErrorMessage('Não conseguimos buscar agora. Verifique sua conexão ou tente novamente em alguns minutos.');
      setCharacters([]);
    }
  };

  const filteredCharacters = useMemo(() => {
    return characters.filter((char) =>
      char.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [characters, search]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Rick and Morty Procurar
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Buscar personagem"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Box className="card-list">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        ) : (
          !errorMessage && (
            <Typography variant="body1">
              {search.trim() === ''
                ? 'Comece digitando o nome de um personagem para ver os resultados.'
                : ''}
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
}

export default App;
