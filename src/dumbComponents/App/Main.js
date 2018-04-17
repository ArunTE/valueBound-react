import React, { Component } from "react"
import container from "../../components"
import Member from "../Member/Member"
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedOption: '',
      userName: '',
      value: '',
      listName: ''
    }
  }
  
  componentDidMount(){
    this.props.getList();
  }

  handleChange = (selectedOption) => {
    if(selectedOption) {
      this.setState({ ...this.state, selectedOption })
      this.props.getMembers(selectedOption)
    }
  }

  nameChange(event) {
    this.setState({...this.state, value: event.target.value});
    event.preventDefault();
  }

  listNameChange(event) {
    this.setState({...this.state, listName: event.target.value});
    event.preventDefault();
  }

  addMember() {
    const { userName, value } = this.state
    const { id, id_str } = this.state.selectedOption
    if(value === '' || id_str === undefined) {
      alert("Please enter atleast one handle and select a list");
    }
    this.props.addMember(id_str, value)
  }

  createListAddMembers() {
    const { value, listName } = this.state
    if(value === '' || listName === '') {
      alert("Please enter atleast one handle and a new list name");
    }
    this.props.createListAddMembers(value, listName)
  }

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const { members } = this.props
    const { users } = members
    
    return(
    <div className="wrapper">
    <br/>
     {
       this.props.loading ?
        (<div className="overlay">
           <div className="loader"><p>loading ...</p></div>
        </div>) : ''
     }
        <div>
           <form>
              <label>
                Enter Multipe Handles: 
                <textarea value={this.state.value} onChange={this.nameChange.bind(this)} />
              </label>
              <br />
              <br />
              <br />
              <label>
                Enter new list name: 
                <textarea value={this.state.listName} onChange={this.listNameChange.bind(this)} />
              </label>
              <br />
              <p>(or)</p>
              <p>Select a list</p>
              <Select
                style={{width:'100px'}}
                name="form-field-name"
                value={value}
                onChange={this.handleChange}
                options={this.props.lists}
              />
              <br />
           </form>
           <br />
           <button className=" button" onClick={()=>{this.createListAddMembers()}}> CREATE LIST AND ADD MEMBER</button>&nbsp;&nbsp;
           <button className=" button" onClick={()=>{this.addMember()}}> ADD MEMBER</button>
        </div>
        {
          members
          ?(<div>
            <p> {selectedOption.value} </p>
            <br/>
            </div>
            )
          :''
        }
        {
          users && users.map((user, index) => {
              return (
                <Member 
                  key={index}
                  data={user}
                />
              )    
            })
        }

    </div>
    )
  }
}

export default container(App)
  