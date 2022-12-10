import { Typography } from "@mui/material";
import { useState } from "react";
import { getDocInCollection, updateDocByID } from "../../utils/firebase";

const CommentForm = (props) => {
    const { currentUser, postID, fetchPosts } = props;
    const defaultFormFields = {
        content: '',
        author: currentUser.uid,
        createdAt: new Date()
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { content } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const postRef = await getDocInCollection('posts', postID);
            var commentsRef = postRef.data().comments;
            console.log(commentsRef);
            commentsRef = [...commentsRef, formFields]
            const res = await updateDocByID('posts', postID, {comments: commentsRef});
            console.log(res);
            resetFormFields();
            fetchPosts();
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className='new-comment-form'>
            <p>Add a comment:</p>
            <form onSubmit={handleSubmit}>
                <textarea required onChange={handleChange} label='Content' name='content' value={content} className='content-input' type='text' size='100%'/>
                <button type="submit">Comment</button>
            </form>
        </div>
    )

}

export default CommentForm;