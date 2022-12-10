import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';

import NewPostForm from '../NewPostForm/new-post-form';

const NewPostModal = (props) => {

    const style = {
        position: 'relative',
        top: '10%',
        margin: 'auto',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
        
    const {handleClose, isOpen, currentUser, fetchPosts} = props;
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="New Post Modal"
            aria-describedby="Create a new post"
        >
            <Box sx={style}>
                <NewPostForm fetchPosts={fetchPosts} currentUser={currentUser} handleClose={handleClose}/>
            </Box>
        </Modal>
    )
}

export default NewPostModal;