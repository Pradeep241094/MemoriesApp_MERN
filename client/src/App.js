import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import RCB from './images/RCB.jpg';


const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
      </AppBar>
      <Grow in>
        <Container>
        <Typography className={classes.heading} variant="h2" align="left">Materials</Typography>
        <Button
        variant="contained"
        color="primary"
        style={{marginLeft: 8, marginRight: 8, marginBottom: 8}}
        startIcon={<AddIcon />}
      >
        Add
      </Button>
      <Button
        variant="contained"
        style={{marginLeft: 8, marginRight: 8, marginBottom: 8, backgroundColor: 'red', color: 'white'}}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={4}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
