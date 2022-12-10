import * as React from "react";
import { useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { getDocInCollection } from "../../utils/firebase";
import CommentForm from "../CommentForm/comment-form";
import Comment from '../Comment/comment';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Post = (props) => {
  const [expanded, setExpanded] = useState(false);
  const {author, content, createdAt, comments, postID, currentUser, fetchPosts, likes} = props;
  const [userName, setUserName] = useState('');
  const [isNameLoading, setIsNameLoading] = useState(true);

  useEffect(() => {
    async function getUserDoc() {
      try {
        if(author){
          const u = await getDocInCollection('users', author);
          setUserName(u.data().displayName);
          setIsNameLoading(false);
        }
      } catch(error) {
        console.log(error);
      }
    }

    getUserDoc();
  }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ maxWidth: 345, margin: 6, minWidth: 500 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={isNameLoading ? 'author' : userName}
        subheader={createdAt.toLocaleString()}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://turnerdentalcare.com/wp-content/uploads/2014/04/smiling-people-turner-dental-care-e1397791456739.jpg"
        alt="Post image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like this post">
          <FavoriteIcon/>
          5
        </IconButton>
        {(comments.length > 0) &&
        <div>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show comments"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          {comments.length} comments
        </div>
        }
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments &&
            comments.map((comment, idx) => (
              <Comment author={comment.author} content={comment.content} key={idx}/>
            ))
          }
        </CardContent>
      </Collapse>
      <CommentForm fetchPosts={fetchPosts} currentUser={currentUser} postID={postID}/>
    </Card>
  );
};

export default Post;
