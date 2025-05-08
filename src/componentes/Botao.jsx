import React from 'react';
import PropTypes from 'prop-types';

const Botao = ({ onClick, className = 'btn btn-dark', label }) => {
    return (
        <button className={className} onClick={onClick}>
            {label}
        </button>
    );
};

Botao.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Botao;