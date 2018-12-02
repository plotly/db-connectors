import React from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ResultsTable extends React.Component {
   /**
     * Query props
     * @type     {object}        props
     * @property {array}         props.columnNames - Array of the Column Names
     * @property {array}         props.rows - Array of the results
     */
    static propTypes = {
        columnNames: PropTypes.array,
        rows: PropTypes.array
    }  

    render() {
        if( !this.props.columnNames || !this.props.rows){
            return (
                <Error message={'Unexpected error creating Results Table.  Missing properties'} />
            );
        }else{
            return (
                <ReactTable data={this.props.rows} columns={this.props.columnNames} />
            );
        }

    }
}

export default ResultsTable;