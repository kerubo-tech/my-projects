import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class TdlistsContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  tdlists: []
		}
	  }
	
	  loadTdlists() {
		axios.get('/api/version1/tdlists')
		.then(res => {
		  this.setState({tdlists: res.data})
		})
		.catch(error => console.log(error))
	  }

	  newTdlist = (e) => {
		if (e.key === 'Enter' && !(e.target.value === '')) {
		  axios.post('/api/version1/tdlists', {tdlist: {title: e.target.value}})
		  .then(res => {
			const tdlists = update(this.state.tdlists, {
			  $splice: [[0, 0, res.data]]
			})

			this.setState({
			  tdlists: tdlists,
			  inputValue: ''
			})
			
		  })
		  .catch(error => console.log(error))      
		}    
	  }
	
	  handleChange = (e) => {
		this.setState({inputValue: e.target.value});
	  }

	  modifyTdlist = (e, id) => {
		axios.put(`/api/version1/tdlists/${id}`, {tdlist: {done: e.target.checked}})
		.then(res => {
		  const tdlistIndex = this.state.tdlists.findIndex(x => x.id === res.data.id)
		  const tdlists = update(this.state.tdlists, {
			[tdlistIndex]: {$set: res.data}
		  })
		  this.setState({
			tdlists: tdlists
		  })
		})
		.catch(error => console.log(error))      
	  }

	  removeTdlist = (id) => {
		axios.delete(`/api/version1/tdlists/${id}`)
		.then(res => {
		  const tdlistIndex = this.state.tdlists.findIndex(x => x.id === id)
		  const tdlists = update(this.state.tdlists, {
			$splice: [[tdlistIndex, 1]]
		  })
		  this.setState({
			tdlists: tdlists
		  })
		})
		.catch(error => console.log(error))
	  }
	
	  componentDidMount() {
		this.loadTdlists()
	  }

  render() {
    return (
      <div>
	<div className="taskContainer">
	  <input className="newTask" type="text" 
	    placeholder="Input a New Task and Press Enter" maxLength="75"
		onKeyPress={this.newTdlist}
		value={this.state.inputValue} onChange={this.handleChange} />
	</div>  	    
	<div className="wrapItems">
	   <ul className="listItems">
		   {this.state.tdlists.map((tdlist) => {
			   return(
		      <li className="item" tdlist={tdlist} key={tdlist.id}>
				  <input className="itemCheckbox" type="checkbox"
				  checked={tdlist.done}
				  onChange={(e) => this.modifyTdlist(e, tdlist.id)} />
				  <label className="itemDisplay">{tdlist.title}</label>
				  <span className="removeItemButton"
					  onClick={(e) => this.removeTdlist(tdlist.id)}>
					  x
					  </span>
		      </li>
			  )
			  })}
	   </ul>
	</div>
      </div>    
    )
  }
}

export default TdlistsContainer