import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
  '& > *': {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  },
  display: 'flex',
  flexWrap: 'wrap',
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch'
  }
}))

export default function Register() {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          defaultValue="Username"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="First Name"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Last Name"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Email"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
        />
        <TextField
          required
          id="outlined-password-confirm"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
        />
        <div className={classes.root}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
            Upload Profile Photo
            </Button>
          </label>
          <Button variant="outlined">Submit</Button>
        </div>
      </div>
    </form>
  )
}