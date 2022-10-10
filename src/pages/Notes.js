import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import NoteCard from "../components/NoteCard";
import Masonry from 'react-masonry-css';

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("https://global-apis.herokuapp.com/notes/")
    .then(res => res.json())
    .then(data => setNotes(data))
    .catch(err => console.error(err))
  }, [])

  const handleDelete = async (id) => {
    await fetch(`https://global-apis.herokuapp.com/notes/${id}/`, {
      method: "DELETE",
      headers: { "Content-Type": 'application/json' }
    })
    .catch(err => console.error(err));

    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
  }

  const breakpointColumnsObj = {
    default: 4,
    1500: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
      {
        notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))
      }
      </Masonry>
    </Container>
  )
}
