import React, { useState } from 'react';
import { Typography, Button, Container, TextField, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { grey } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";

export default function Create() {
  const styles = {
    field: {
      marginTop: 2,
      marginBottom: 2,
      display: "block",
    }
  }

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const [category, setCategory] = useState("todos");

  const navigate = useNavigate();

  const handleSubmit = () => {
    setTitleError(false);
    setDetailsError(false);

    if(title===""){
      setTitleError(true);
    }

    if(details===""){
      setDetailsError(true);
    }

    if(title && details){
      fetch('https://global-apis.herokuapp.com/notes/', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, details, category })
      }).then(() => navigate('/'))
    }
  }
  return (
    <Container sx={{m: 2}}>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
      >
        Create New Note
      </Typography>

      <TextField
        color="secondary"
        error={titleError}
        onChange={event => setTitle(event.target.value)}
        fullWidth
        required
        label="Note Title"
        variant="outlined"
        sx={styles.field}
      />

      <TextField
        color="secondary"
        error={detailsError}
        onChange={event => setDetails(event.target.value)}
        fullWidth
        required
        multiline
        rows={4}
        label="Note Details"
        variant="outlined"
        sx={styles.field}
      />

      <FormControl>
        <FormLabel color="secondary">Note Category</FormLabel>
        <RadioGroup row value={category} onChange={event => setCategory(event.target.value)}>
          <FormControlLabel label={<Typography color="textSecondary">Money</Typography>} value="money" control={<Radio color="secondary" />} />
          <FormControlLabel label={<Typography color="textSecondary">Todos</Typography>} value="todos" control={<Radio color="secondary" />} sx={{color: grey[400]}} />
          <FormControlLabel label={<Typography color="textSecondary">Reminders</Typography>} value="reminders" control={<Radio color="secondary" />} sx={{color: grey[400]}} />
          <FormControlLabel label={<Typography color="textSecondary">Work</Typography>} value="work" control={<Radio color="secondary" />} sx={{color: grey[400]}} />
        </RadioGroup>
      </FormControl>

      <Button
        sx={{marginTop: 1}}
        onClick={handleSubmit}
        fullWidth
        color="secondary"
        variant="contained"
        endIcon={<ArrowForwardIosIcon />}
      >
        Submit
      </Button>
    </Container>
  )
}
