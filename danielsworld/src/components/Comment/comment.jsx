import { Typography } from "@mui/material"

import { useState, useEffect } from 'react';

import { getDocInCollection } from "../../utils/firebase";



const Comment = (props) => {
    const { content, author } = props;
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


    return (
        <div className="comment-container">
            <Typography variant='h6'>
                {isNameLoading ? 'error' : userName}
            </Typography>
            <Typography variant="p">
                {content}
            </Typography>
        </div>
    )
}

export default Comment;