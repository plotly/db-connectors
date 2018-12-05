import React, { Component } from 'react';
import './App.css';
import DBSelector from './components/DBSelector';
import {getDialects} from './common/constants';
import ResultsTable from './components/ResultsTable';
import ConnectionDialog from './components/ConnectionDialog';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      rows:[],
      columns:[],
      dialect:''
    };
  }

  connectorSelected( dialect ){
    this.setState({dialect:dialect.value});
  }

  query(cols, rows){
    console.log( `Query the data`);
    this.setState({columns:cols, rows:rows});
  }

  render() {
    return (
      <div className="App">
        <DBSelector  options={getDialects()} connectorSelected={this.connectorSelected.bind(this)}/>
        <ConnectionDialog dialect={this.state.dialect} query={this.query.bind(this)}/>
        <ResultsTable columnNames={this.state.columns} rows={this.state.rows} />
      </div>
    );
  }
}

export default App;
