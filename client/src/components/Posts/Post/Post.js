import React from 'react';
import { Card, Grid, Paper, CardActions, CardContent, CardMedia, Button, Typography, Container } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Paper>
       <Card className={classes.root} onClick={() => setCurrentId(post._id)}>
      <CardContent>
        <Grid >
        <Typography className={classes.fieldValue} color="textPrimary">
        Material Name
        </Typography>
        <Typography className={classes.fieldValue} color="textSecondary">
        Volume in m3
        </Typography>
        </Grid>
      </CardContent>
    </Card>
    </Paper>
   
  );
};

export default Post;
