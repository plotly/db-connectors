import React, { Component } from 'react';
import './App.css';
import DBSelector from './components/DBSelector';
import {getDialects} from './common/constants';
import ResultsTable from './components/ResultsTable';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      rows:[],
      columns:[]
    };
  }

  connectorSelected( dialect ){
    console.log( 'Dialect Selected', dialect.value);
  }
  render() {
    return (
      <div className="App">
        <DBSelector  options={getDialects()} connectorSelected={this.connectorSelected.bind(this)}/>

        <ResultsTable columnNames={this.state.columns} rows={this.state.rows} />
      </div>
    );
  }
}

export default App;
