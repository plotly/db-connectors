import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.Component {
   /**
     * DB Component props
     * @type     {object}          props
     * @property {array}           props.message - Error Message
     */
    static propTypes = {
        message: PropTypes.string
    }  

    render() {
        let msg = this.props.message;
        if( !msg ){
            msg = 'Unexpected Error building the component';
        }
        return (
            <div><p>{msg}</p></div>

        );
    }
}

export default Error;