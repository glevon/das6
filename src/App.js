import React, { Component } from 'react'
import { BrowserRouter,Route} from "react-router-dom"
import Alldb from './components/Alldb'
import Db from './components/Db'
import Table from './components/Table'


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        
          <Route path="/" exact component={Alldb} />
          <Route path="/database/:name"  component={Db} />
          <Route path="/table/:name"  component={Table} />



        </BrowserRouter>
        
      </div>
    )
  }
}

export default App