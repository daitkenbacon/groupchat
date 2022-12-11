import { Typography } from "@mui/material";

import { useState } from 'react';

import './new-post-form.scss';

import { createDocInCollection, getStorageRef } from '../../utils/firebase';
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";

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
    const [imgURL, setImgURL] = useState('');
    const [file, setFile] = useState();
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        setFile(event.target.files[0]);

        const storageRef = getStorageRef(`img/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                setUploadProgress(progress);
            }
        );

        await uploadTask;
        setImgURL(getDownloadURL(storageRef));
        console.log('URL: ' + imgURL);
        setFormFields({...formFields, image: imgURL});
    }

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
                <input type='file' label='image' name='image' className='image-input' onChange={handleUpload} />
                <button type="submit">Post</button>
            </form>
            {
                !imgURL &&
                <div className='outerbar'>
                    <div className='innerbar' style={{ width: `${uploadProgress}`}}>
                        {uploadProgress}%
                    </div>
                </div>
            }
            {
                imgURL &&
                <img src={imgURL} alt='uploaded file' height={200} />
            }
        </div>
    )
}

export default NewPostForm;