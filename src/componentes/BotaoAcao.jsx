import React from 'react';

const Botao = ({ onClick = '', className = 'btn-secondary', label, disabled = false }) => {

    const stdClassName = 'btn';

    const fullClassName = `${stdClassName} ${className}`;

    const isCallbackValid = typeof (onClick) === 'function';

    const warnString = `[BotaoAcao] callback 'onClick' não informado`;

    const handleClick = isCallbackValid ? onClick : () => console.warn(warnString);

    if(!isCallbackValid) console.warn(warnString);

    return (
        <button
            type='button'
            className={!onClick ? `${fullClassName} disabled` : fullClassName}
            onClick = {handleClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Botao;