import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, withStyles, Grid, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { red } from '@material-ui/core/colors';
import  ColorPickerComponent  from '../CustomColorPicker';


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ name: '', cost: '', volume: '', delivery_date: '', color: '', total: '' });
  const materials = useSelector((state) => (currentId ? state.materials.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: '#bb2421',
      '&:hover': {
        backgroundColor: '#bb2421',
      },
    },
  }))(Button);

  useEffect(() => {
    if (materials) setPostData(materials);
  }, [materials]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ name: '', volume: '' , cost: '', delivery_date: '', color: '', total: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${materials.title}"` : 'Add a Material'}</Typography>
        <Grid container spacing = {3}>
        <Grid item xs={6}>
          <TextField name="Material Name" variant="outlined" label="Material Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
          </Grid>
          <Grid  item xs={6}>
          <ColorPickerComponent color = {postData.color}/>
        </Grid>
        <Grid item xs={6}>
        <TextField  type='number' name="Volume" variant="outlined" label="Volume" fullWidth value={postData.volume} onChange={(e) => setPostData({ ...postData, volume: e.target.value })} />
          </Grid>
          <Grid item xs={6}>
          <TextField   type='number' name="Cost (USD per m3)" variant="outlined" fullWidth label="Cost (USD per m3)" value={postData.cost} onChange={(e) => setPostData({ ...postData, cost: e.target.value })} />
          </Grid>
          <Grid  item xs={6}>
          <TextField
            id="date"
            label="Delivery Date"
            type="date"
            fullwidth
            defaultValue="2021-01-01"
            // className={classes.textField}
            value={postData.delivery_date}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={(e) => setPostData({ ...postData, delivery_date: e.target.value })}
      />
          </Grid>
          <Grid item xs={6}>
          <TextField   type='number' name="Total Cost (USD per m3)" variant="outlined" fullWidth label="Total Cost" value={postData.cost * postData.volume}  />
          </Grid>
        </Grid>
       <Grid>
       <Grid item xs={6}>
        <ColorButton className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit" fullWidth>Submit</ColorButton>
        </Grid>
       <Grid  item xs={6}>
       <Button variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>
       </Grid>
       </Grid>
     
  
      </form>
    </Paper>
  );
};

export default Form;
