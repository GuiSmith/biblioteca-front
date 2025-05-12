import { Link } from 'react-router-dom';

const BotaoLink = ({ to = null, label, className = 'btn-dark', style = {} }) => {

    const stdClassName = 'btn';

    const fullClassName = `${stdClassName} ${className}`;

    const isDisabled = !to;

    const warnString = `[BotaoLink] 'to' não passado para botão`;

    if(isDisabled) console.warn(warnString);

    return (
        <Link
            to={to}
            className={`${fullClassName} ${isDisabled ? 'disabled' : ''}`}
            style={style}
            onClick = {e => {
                if (isDisabled) {
                    e.preventDefault();
                    console.warn(`[BotaoLink] 'to' não passado para botão`);
                }
            }}
        >
            {label}
        </Link>
    );
};

export default BotaoLink;
