import { Typography } from "@mui/material";

import { useState } from 'react';

import './new-post-form.scss';

import { createDocInCollection } from '../../utils/firebase';

const defaultFormFields = {
    content: '',
    image: ''
}


const NewPostForm = (props) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { content, image } = formFields;
    const { currentUser } = props;

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
            setFormFields({...formFields, author_id: currentUser.uid})
            const res = await createDocInCollection(formFields, 'posts');
            resetFormFields();
        } catch(error) {
            console.log(error);
        }
        
    }

    return (
        <div className='new-post-container'>
            <Typography>New Post</Typography>
            <form onSubmit={handleSubmit}>
                <input required onChange={handleChange} label='Content' name='content' value={content} className='content-input' type='text' size='100%'/>
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default NewPostForm;