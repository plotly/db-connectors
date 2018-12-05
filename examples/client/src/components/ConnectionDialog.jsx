import React from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import ConnectionLabel from './ConnectionLabel';
import {getSchemaAttributes, getSchema} from '../common/constants';

/**
 * The following function will retrieve the connection attributes
 * by the string
 * @param {string} dialect 
 */
const getConnectionAttributes = (dialect) =>{
    const schema = getSchema(dialect);
    return getSchemaAttributes(schema.properties);

};

const ConnectionDialog = ({dialect,query}) => {

    const attributes = getConnectionAttributes(dialect);
    if( !dialect || !attributes ){
        return (<Error message={'Unable to create the label missing properties'}/>);
    }else{
        return (
            <div>
                {
                    attributes.map( (attr,index) => {
                        return (<ConnectionLabel key={index} {...attr} />)
                    } )
                }
                <button type="submit" onClick={query}>Query</button>
            </div>
        );
    }

}

/**
 * DB Component props
 * @type     {object}          props
 * @property {string}          props.dialect - The Connection Attributes
 * @property {func}            props.query - The Query Function
 */
ConnectionDialog.propTypes = {
    dialect: PropTypes.string.isRequired,
    query: PropTypes.func.isRequired
};  


export default ConnectionDialog;