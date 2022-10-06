import React from 'react';
import { Avatar, Card, CardContent, Typography, CardHeader, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue, green, pink, yellow } from '@mui/material/colors';

export default function NoteCard({ note, handleDelete }) {
  return (
    <Card elevation={3}>
      <CardHeader
        avatar={<Avatar sx={{
          bgcolor: () => {
            if(note.category === "work") return yellow[700]
            else if(note.category === "money") return green[500]
            else if(note.category === "todos") return pink[500]
            else return blue[500]
          }
        }}>
          {note.category[0].toUpperCase()}
        </Avatar>}
        action={
          <IconButton aria-label="delete" onClick={() => handleDelete(note.id)}>
            <DeleteIcon  />
          </IconButton>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography variant="body2" component="div">{note.details}</Typography>
      </CardContent>
    </Card>
  )
}
