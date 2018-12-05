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
    return getSchemaAttributes(schema);

};

const ConnectionDialog = ({dialect}) => {

    const attributes = getConnectionAttributes(dialect);
    if( !dialect || !attributes ){
        return (<Error message={'Unable to create the label missing properties'}/>);
    }else{
        return (
            <div>
                {
                    attributes.map( attr => {
                        return (<ConnectionLabel {...attr} />)
                    } )
                }
            </div>
        );
    }

}

/**
 * DB Component props
 * @type     {object}          props
 * @property {string}          props.dialect - The Connection Attributes
 */
ConnectionDialog.propTypes = {
    dialect: PropTypes.string.isRequired
};  


export default ConnectionDialog;