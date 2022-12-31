import * as React from "react";
import { useEffect, useState } from 'react';

import { getDocInCollection } from "../../utils/firebase";

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import CommentForm from "../CommentForm/comment-form";
import Comment from '../Comment/comment';

import './post.scss';

const Post = (props) => {
  const [expanded, setExpanded] = useState(false);
  const {author, content, createdAt, comments, postID, currentUser, fetchPosts, likes, image} = props;
  const [userName, setUserName] = useState('');
  const [userNameAbbr, setUserNameAbbr] = useState('');
  const [isNameLoading, setIsNameLoading] = useState(true);

  useEffect(() => {
    async function getUserDoc() {
      try {
        console.log('get username');
        if(author){
          const u = await getDocInCollection('users', author);
          const abbr = u.data().displayName.split(' ').map(word => word[0]).join('');
          setUserNameAbbr(abbr);
          setUserName(u.data().displayName);
          setIsNameLoading(false);
        }
      } catch(error) {
        console.log(error);
      }
    }

    getUserDoc();
  }, [])

  const isUsersPost = (author===currentUser);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    // <Card sx={{ maxWidth: 345, margin: 6, minWidth: 500 }}>
    //   <CardHeader
    //     avatar={
    //       <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              
    //       </Avatar>
    //     }
    //     action={
    //       <IconButton aria-label="settings">
    //         <MoreVertIcon />
    //       </IconButton>
    //     }
    //     title={isNameLoading ? 'author' : userName}
    //     subheader={createdAt.toLocaleString()}
    //   />
    //   <CardMedia
    //     component="img"
    //     height="194"
    //     image={image}
    //     alt="Post image"
    //   />
    //   <CardContent>
    //     <Typography variant="body2" color="text.secondary">
    //       {content}
    //     </Typography>
    //   </CardContent>
    //   <CardActions disableSpacing>
    //     <IconButton aria-label="like this post">
    //       <FavoriteIcon/>
    //       5
    //     </IconButton>
    //     {(comments.length > 0) &&
    //     <div>
    //       <ExpandMore
    //         expand={expanded}
    //         onClick={handleExpandClick}
    //         aria-expanded={expanded}
    //         aria-label="show comments"
    //       >
    //         <ExpandMoreIcon />
    //       </ExpandMore>
    //       {comments.length} comments
    //     </div>
    //     }
    //   </CardActions>
    //   <Collapse in={expanded} timeout="auto" unmountOnExit>
    //     <CardContent>
    //       {comments &&
    //         comments.map((comment, idx) => (
    //           <Comment author={comment.author} content={comment.content} key={idx}/>
    //         ))
    //       }
    //     </CardContent>
    //   </Collapse>
    //   <CommentForm fetchPosts={fetchPosts} currentUser={currentUser} postID={postID}/>
    // </Card>



    <div className={`post-container ${isUsersPost ? 'user-post' : 'other-post'}`}>
      <h2 className="post-author bg-white text-black">{userNameAbbr}</h2>
      <p className={`post-content ${isUsersPost ? 'bg-blue' : 'bg-green'} text-white`}>
        {content}
        <div className="post-comments">
          {`${(comments.length > 0) ? comments.length : ''}`}
          <ChatBubbleOutlineIcon onClick={handleExpandClick}/>
          {expanded &&
            comments &&
            <div>
              {comments.map((comment, idx) => (
                <Comment author={comment.author} content={comment.content} key={idx}/>
              ))}
              <CommentForm fetchPosts={fetchPosts} currentUser={currentUser} postID={postID}/>
            </div>
          }
        </div>
      </p>
    </div>
  );
};

export default Post;
