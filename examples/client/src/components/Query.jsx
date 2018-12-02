import React from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

class Query extends React.Component {
   /**
     * Query props
     * @type     {object}        props
     * @property {func}          props.query - Function Property
     */
    static propTypes = {
        query: PropTypes.func
    }  

    render() {
        if( !this.props.query){
            return (
                <Error message={'Unexpected error creating Query field.  Missing property'} />
            );
        }else{
            return (
                <div>
                    <textarea rows="4" cols="50"></textarea>
                    <button type="button" onClick={this.props.query}>Query</button>
                </div>
            );
        }

    }
}

export default Query;