import React from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const ConnectionLabel = ({label, type, description}) => {

    if( !label || !type ){
        return (<Error message={'Unable to create the label missing properties'}/>);
    }else{
        let inputType;
        if( type === 'string') {
            inputType = 'text';
        }else{
            inputType = type;
        }
        return (
            <div>
                <label htmlFor={`id-${label}`}>{label}</label>
                <input type={inputType} id={`id-${label}`}/>
            </div>
        );
    }

}

/**
 * DB Component props
 * @type     {object}          props
 * @property {string}          props.label - The label for the input
 * @property {func}            props.type - The type of input {string, number, password, or email}
 * @property {string}          props.description - The description of the label
 */
ConnectionLabel.propTypes = {
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string
};  

export default ConnectionLabel;