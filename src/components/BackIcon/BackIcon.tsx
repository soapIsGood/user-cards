import { ReactComponent as BackSvg } from '../../img/eva_arrow-ios-back-fill.svg'

type BackIconProps = {
    onClick?: () => void;
    className?: string;
}
 
const BackIcon: React.FC<BackIconProps> = ({onClick, className = ''}) => {
    return (
        <div>
            <BackSvg className={className} onClick={onClick}></BackSvg>
        </div>
    );
};

export default BackIcon;
