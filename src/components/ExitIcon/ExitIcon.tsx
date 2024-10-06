import { ReactComponent as ExitSvg} from '../../img/ic_round-exit-to-app.svg'

type ExitIconProps = {
    onClick?: () => void;
    className?: string;
}

const ExitIcon: React.FC<ExitIconProps> = (
    {onClick, 
    className = ''
    }
) => {
    return (
        <div>
            <ExitSvg className={className} onClick={onClick}></ExitSvg>
        </div>
    );
};

export default ExitIcon;