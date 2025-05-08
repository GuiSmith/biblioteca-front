import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BotaoLink = ({ to, label, className, style = {} }) => {
    return (
        <Link
            to={to}
            className={className}
            style={style}
        >
            {label}
        </Link>
    );
};

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
};

LinkButton.defaultProps = {
    className: '',
    style: {},
};

export default BotaoLink;
