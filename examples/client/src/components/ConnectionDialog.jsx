import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Error from './Error';



class ConnectionDialog extends React.Component {
   /**
     * DB Component props
     * @type     {object}          props
     * @property {string}          props.dialect - Dialect for the database
     * @property {func}            props.connect - A function to connect to the specified db
     * @property {func}            props.edit - A function to edit the conection
     */
    static propTypes = {
        dialect: PropTypes.string,
        connect: PropTypes.func,
        edit: PropTypes.func
    }  

    render() {
        const { selectedOption } = this.state;

        if( this.props.dialect && this.props.connect && this.props.edit){
            return (
                <Select
                    value={selectedOption}
                    onChange={this.props.connectorSelected}
                    options={this.props.options}
                />
            );
        }else{
            return (<Error message={'Unexpected Error creating db selector'}/>);
        }
    }
}

export default ConnectionDialog;