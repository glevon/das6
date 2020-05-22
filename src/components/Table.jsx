import React, { Component } from 'react'
import Axios from "axios"

class Table extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            keys:[],
            info:[],
            show_inp:"none",
            userInput:{
                name:"",
                email:"",
                password:""
            },
            current_id:"",
            error:""
        }
    }
    change(e){
        let k=e.target.getAttribute("data-id")
        this.state.userInput[k]=e.target.value
        this.setState({})
    }
    save(){
        this.state.error=""
        for(let i in this.state.userInput){
            if(this.state.userInput[i]===""){
                this.state.error="Please fill in all fields"
            }
        }
        if (this.state.error==="") {
            Axios.post("http://localhost:4000/update",{table:this.props.match.params.name,data:this.state.userInput,id:this.state.current_id})
                .then(r=>{
                    this.state.show_inp="none"
                    this.state.userInput.name=""
                    this.state.userInput.email=""
                    this.state.userInput.password=""
                    this.componentDidMount()
                    this.render()
                                
                })        
        }
        else{
            alert(this.state.error)
        }
    }
    delete(a){
        Axios.post("http://localhost:4000/delete",{table:this.props.match.params.name,id:a.id})
        .then(r=>{
            this.componentDidMount()
            this.render()
                        
        })

    }
    show(a){
        if (this.state.show_inp==="block" && a.id===this.state.current_id) {
            this.state.show_inp="none"
        }
        else{
            this.state.show_inp="block"
        }
        this.state.userInput.name=a.name
        this.state.userInput.email=a.email
        this.state.userInput.password=a.password
        this.state.current_id=a.id
        this.setState({})
    }
    componentDidMount(){
        Axios.post("http://localhost:4000/table",{table:this.props.match.params.name} )
        .then(r=>{
            
            if(r.data.length){
                this.state.keys=Object.keys(r.data[0])
                this.state.info=r.data
            }
            else{
                this.state.info=[]
            }
            this.setState({})

        })
    }
    
    render() {
        return (
            <div>
                <h1>Table:{this.props.match.params.name}</h1>
                <h4>Data</h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            {
                                this.state.keys.map((a,i)=>{
                                    return(
                                        <th key={i}>
                                            {a}
                                        </th>

                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.info.map((a,i)=>(
                                <tr key={i}>
                                    {
                                        Object.values(a).map((item,index)=>(
                                            <td key={index}>
                                                {item}
                                            </td>
                                        ))
                                    }
                                    <td>
                                        <button onClick={this.delete.bind(this,a)} className="btn btn-danger">Delete</button>
                                        <button onClick={this.show.bind(this,a)} className="btn btn-info">Edit</button>
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                </table>
                <table  style={{display:this.state.show_inp}} className="table table-hover">
                    <thead>
                    <tr >
                            {
                                this.state.keys.map((a,i)=>{
                                    return(
                                        <th key={i}>
                                            {a}
                                        </th>

                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>
                                {this.state.current_id}
                            </td>
                            <td>
                                <input onChange ={this.change.bind(this)} value={this.state.userInput.name} data-id="name" type="text" id="name" className="form-control" />
                            </td>
                            <td>
                                <input onChange ={this.change.bind(this)} value={this.state.userInput.email} data-id="email" type="email" id="email" className="form-control" />
                            </td>
                            <td>
                                <input onChange ={this.change.bind(this)} value={this.state.userInput.password} data-id="password" type="password" id="password" className="form-control" />
                            </td>
                            <td>
                                <button onClick={this.save.bind(this)} className="btn btn-success">Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        )
    }
}

export default Table
