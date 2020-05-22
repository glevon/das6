import React, { Component } from 'react'
import Axios from "axios"
import {Link} from "react-router-dom"

class Alldb extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            databases:[]
             
        }
    }
    componentDidMount(){
        Axios.post("http://localhost:4000/database")
        .then(r=>{
            console.log(r);
            this.state.databases=r.data
            this.setState({})
        })
    }
    
    render() {
        return (
            <div>
                <h1>All Databases</h1>
                <div className="list-group">
                    {
                        this.state.databases.map((a,i)=>(
                        <Link to={`/database/${a.Database}`} key={i} className="list-group-item list-group-item-action">{a.Database}</Link>
                        ))
                    }

                </div>
            </div>
        )
    }
}

export default Alldb
