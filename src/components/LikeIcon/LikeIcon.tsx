import { useState, useEffect } from 'react';
import {ReactComponent as Like} from '../../img/Vector.svg'
import classes from './LikeIcon.module.css'

interface LikeIconProps {
    userId: number;
}

const LikeIcon: React.FC<LikeIconProps> = ({ userId }) => {
    const [liked, setLiked] = useState(false)

    // Загружка состояния лайка из localStorage при загрузке компонента
    useEffect(() => {
        const savedLikeStatus = localStorage.getItem(`like-${userId}`);
        if (savedLikeStatus === 'true') {
            setLiked(true);
        }
    }, [userId]);

    const toggleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const newLikedStatus = !liked;
        setLiked(newLikedStatus);
        localStorage.setItem(`like-${userId}`, String(newLikedStatus));
    };

    return (
        <div 
            className={`${classes['like-wrapper']} ${liked ? classes.liked : ''}`}
            onClick={toggleLike}
        >
            <Like/>
        </div>
    );
};

export default LikeIcon;