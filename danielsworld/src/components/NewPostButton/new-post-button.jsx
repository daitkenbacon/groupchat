import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add';

const NewPostButton = (props) => {
    // const [isSelected, setIsSelected] = useState(false);
    const { handleOpen } = props;

    // const handleClick = (event) => {
    //     setIsSelected((isSelected) => !isSelected);
    // }

    return (
        <div className={`post-button-container`} onClick={() => handleOpen()}>
            <AddIcon sx={{width: '100%', height: '100%'}}/>
        </div>
    );
}

export default NewPostButton;