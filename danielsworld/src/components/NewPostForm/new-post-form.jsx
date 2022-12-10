import { Typography } from "@mui/material";

import { useState } from 'react';

import './new-post-form.scss';

import { createDocInCollection } from '../../utils/firebase';

const NewPostForm = (props) => {
    const { currentUser, handleClose, fetchPosts} = props;

    const defaultFormFields = {
        content: '',
        image: '',
        author_id: currentUser.uid,
        createdAt: new Date(),
        comments: [],
        likes: []
    }
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { content, image } = formFields;

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
            const res = await createDocInCollection(formFields, 'posts');
            console.log(res);
            resetFormFields();
            handleClose();
            fetchPosts();
        } catch(error) {
            console.log(error);
        }
        
    }

    return (
        <div className='new-post-container'>
            <Typography>New Post</Typography>
            <form onSubmit={handleSubmit}>
                <textarea required onChange={handleChange} label='Content' name='content' value={content} className='content-input' type='text' size='100%'/>
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default NewPostForm;