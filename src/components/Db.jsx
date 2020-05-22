import React, { Component } from 'react'
import Axios from "axios"
import {Link} from "react-router-dom"


class Db extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            tables:[]
             
        }
    }
    componentDidMount(){
        Axios.post("http://localhost:4000/showTable",{table:this.props.match.params.name} )
        .then(r=>{
            // console.log(r.data);
            this.state.tables=r.data
            this.setState({})
        })
    }
    
    render() {
        return (
            <div>
                <h1>DB:{this.props.match.params.name}</h1>
                <h4>Tables</h4>
                <div className="list-group">
                    {
                        this.state.tables.map((a,i)=>(
                            <Link to = {`/table/${Object.values(a)[0]}`} key = {i} className="list-group-item list-group-item-action">{Object.values(a)[0]}</Link>
                            
                        ))
                    }

                </div>
            </div>
        )
    }
}

export default Db
