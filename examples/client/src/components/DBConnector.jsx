import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Error from './Error';

class DBConnector extends React.Component {
   /**
     * DB Component props
     * @type     {object}          props
     * @property {array}           props.options - Options for display
     * @property {func}            props.connectorSelected - Connection Request
     */
    static propTypes = {
        options: PropTypes.array,
        connectorSelected: PropTypes.func
    }  
    state = {
        selectedOption: null
    }
    render() {
        const { selectedOption } = this.state;

        if( this.props.options && this.props.connectorSelected){
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

export default DBConnector;