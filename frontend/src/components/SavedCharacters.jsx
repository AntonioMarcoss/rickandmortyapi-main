
import React, { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import { Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const SavedCharacters = ({ token }) => {
  const [characters, setCharacters] = useState([]);

  const fetchSaved = async () => {
    try {
      const res = await fetch("http://localhost:3001/data", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setCharacters(data);
      }
    } catch (err) {
      console.error("Erro ao carregar personagens salvos:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/data/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCharacters((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Erro ao deletar personagem:", err);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, [token]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Personagens Salvos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <AnimatePresence>
          {characters.map((char) => (
            <motion.div
              key={char._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'relative' }}
            >
              <CharacterCard character={char} />
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(char._id)}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  padding: '0 0.5rem',
                  fontSize: '0.7rem'
                }}
              >
                Deletar
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SavedCharacters;
